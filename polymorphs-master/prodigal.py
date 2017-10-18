#!/bin/env python3

import http.server
import socketserver
from Bio import SeqIO
import json
import io
import gzip


class ProdigalHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    presets = [
        { 'name': 'IAI39.gb', 'id': 1 },
        { 'name': 'O83-H1-str-NRG-857C.gb', 'id': 2 },
        { 'name': 'O157-H7-str-Sakai.gb', 'id': 3 },
        { 'name': 'str-K-12-substr-MG1655.gb', 'id': 4 },
        { 'name': 'UMN026.gb', 'id': 5 }
    ]

    def __init_(self, request, client_addr, server):
        self.protocol_version = "HTTP/1.1"
        http.server.SimpleHTTPRequestHandler.__init__(self, request, client_addr, server)

    def do_POST(self):
        if self.path == "/preset/1":
            self.process_preset(self.presets[0]["name"])
        elif self.path == "/preset/2":
            self.process_preset(self.presets[1]["name"])
        elif self.path == "/preset/3":
            self.process_preset(self.presets[2]["name"])
        elif self.path == "/preset/4":
            self.process_preset(self.presets[3]["name"])
        elif self.path == "/preset/5":
            self.process_preset(self.presets[4]["name"])
        else:
            self.process_upload()

    def do_GET(self):
        response = json.dumps(self.presets).encode('utf8')
        self.send_response(http.HTTPStatus.OK)
        if 'gzip' in self.headers['Accept-Encoding']:
            self.send_header("Content-Encoding", "gzip")
            response = gzip.compress(response)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        self.wfile.write(response)
        self.wfile.flush()


    def process_upload(self):
        content_length = self.headers['Content-Length']
        if not content_length or int(content_length) < 1:
            out = "no input"
            self.send_response(http.HTTPStatus.BAD_REQUEST)
            self.end_headers()
            self.wfile.write(out.encode())
            self.wfile.flush()
        else:
            length = int(content_length)

            # proc = subprocess.Popen(["prodigal"], stdin=subprocess.PIPE, stdout=subprocess.PIPE)
            # out, err = proc.communicate(input=self.rfile.read(length))

            f = io.StringIO(self.rfile.read(length).decode('utf8'))
            file = SeqIO.parse(f, 'gb')
            response = GenbankReader().genbank_to_json(file, None)

            self.send_response(http.HTTPStatus.OK)
            if 'gzip' in self.headers['Accept-Encoding']:
                self.send_header("Content-Encoding", "gzip")
                response = gzip.compress(response)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()
            self.wfile.write(response)
            self.wfile.flush()

    def process_preset(self, filename):
        parsed_genome_file = SeqIO.parse(open(filename, 'r'), 'gb')
        response = GenbankReader().genbank_to_json(parsed_genome_file, filename)

        self.send_response(http.HTTPStatus.OK)
        if 'gzip' in self.headers['Accept-Encoding']:
            self.send_header("Content-Encoding", "gzip")
            response = gzip.compress(response)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        self.wfile.write(response)
        self.wfile.flush()


class GenbankReader:
    def genbank_to_json(self, file, filename):
        features = []
        features_count = 0
        last_pos = 0
        for record in file:
            for feature in record.features:
                if feature.type == "CDS":
                    features_count += 1
                    end = feature.location.end
                    if last_pos < end:
                        last_pos = end
                    feat_obj = self.parse_feature(feature, features_count)
                    features.append(feat_obj)

        # build the response
        return json.dumps({
            'sequence': {
                'filename': filename,
                'features_found': features_count,
                'sequence_length': int(last_pos),
                'features': features
            }
        }).encode('utf8')

    @staticmethod
    def parse_feature(feature, feature_id):
        # Set sensible defaults to avoid exceptions

        label = []
        if "gene" in feature.qualifiers:
            label = feature.qualifiers['gene']

        metadata = ""
        if "note" in feature.qualifiers:
            metadata = feature.qualifiers['note']

        protein_id = []
        if "protein_id" in feature.qualifiers:
            protein_id = feature.qualifiers["protein_id"]

        # Construct return object
        return {
            'id': feature_id,
            'protein_id': ','.join(protein_id),
            'label': ','.join(label),
            'start': int(feature.location.start),
            'end': int(feature.location.end),
            'strand': feature.location.strand,
            'metadata': metadata
        }


if __name__ == "__main__":
    try:
        httpd = socketserver.TCPServer(('', 8080), ProdigalHTTPRequestHandler)
        print("beginning prodigal http server on 8080")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("shutting down...")
        httpd.socket.close()

    httpd.server_close()
