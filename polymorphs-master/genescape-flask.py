#!/usr/bin/env python3

from flask import Flask, request, Response
from Bio import SeqIO
import json
import io
import os
import gzip

app = Flask(__name__)


@app.route("/ping")
def ping():
    return "pong!"


@app.route("/genbank", methods=['GET', 'POST'])
def genbank():
    if request.method == 'POST':
        if request.data:
            posted_file = request.data.decode('utf8')
        elif request.files['data']:
            posted_file = request.files['data'].decode('utf8')
        else:
            # no file
            return "no file provided", 400
        
        genbank_data = SeqIO.parse(io.StringIO(posted_file), 'gb')
        response_data = process_genbank_data(genbank_data)
        return build_response(response_data)

    return "HTTP POST your genbank file here"


@app.route("/prodigal", methods=['GET', 'POST'])
def prodigal():
    if request.method == 'POST':
        # process the request
        if request.data:
            posted_file = request.data.decode('utf8')
        elif request.files['data']:
            posted_file = request.files['data'].decode('utf8')
        else:
            # no file
            return "no file provided", 400

        # fork a process to run prodigal, return the result, json formatted

    return "HTTP POST your file here"


@app.route("/test")
def test():
    pwd = os.path.dirname(os.path.realpath(__file__))
    with open(pwd + "/example_response.json", mode='rb') as example_json:
        return build_response(example_json.read())


def build_response(json_response):
    """
    build a flask response given some json to return to the client. compress if the client will accept.
    :param json_response: the json response
    :return: flask response
    """
    if 'gzip' in request.headers['Accept-Encoding']:
        compressed_response = gzip.compress(json_response)
        response = Response(compressed_response)
        response.headers['Content-Encoding'] = 'gzip'
        response.headers['Content-Length'] = str(len(compressed_response))
    else:
        response = Response(json_response)
        response.headers['Content-Length'] = str(len(json_response))

    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    response.headers['Access-Control-Allow-Origin'] = '*'

    return response


def process_genbank_data(data):
    """
    helper for processing a genbank file and formatting it as a json response
    :param data: the genbank file, processed via BioPython
    :return: sequence information as a json response
    """
    features = []
    features_count = 0
    last_pos = 0
    for record in data:
        for feature in record.features:
            if feature.type == 'CDS':
                features_count += 1
                end = feature.location.end
                if last_pos < end:
                    last_pos = end
                feat_obj = parse_feature(feature, features_count)
                features.append(feat_obj)

    return json.dumps({
        'sequence': {
            'features_found': features_count,
            'sequence_length': int(last_pos),
            'features': features
        }
    }).encode('utf8')


def parse_feature(feature, feature_id):
    """
    helper for building a generic feature object
    :param feature: BioPython feature
    :param feature_id: some unique identifier for this feature
    :return: generic feature object
    """
    return {
        'id': feature_id,
        'protein_id': '.'.join(feature.qualifiers['protein_id']),
        'label': '.'.join(feature.qualifiers['gene']),
        'start': int(feature.location.start),
        'end': int(feature.location.end),
        'strand': feature.location.strand,
        'metadata': feature.qualifiers['note']
    }

if __name__ == "__main__":
    print("starting genescape.. ")
    app.run()

