#!/bin/env python3

import json
import os
from pprint import pprint
from requests import get
import subprocess

print("starting...")


def download_latest_release():
    print("downloading prodigal...")
    req_content = json.loads(get("https://api.github.com/repos/hyattpd/Prodigal/releases/latest").content.decode('utf-8'))
    print("installing %s" % req_content["name"])
    system_os = "linux" if os.name == "posix" else ("nt" if os.name == "nt" else "osx")
    print(system_os)
    for obj in req_content["assets"]:
        if system_os in obj["name"]:
            pprint(obj)
            # wget(obj["browser_download_url"], obj["name"])


def wget(url, file_name):
    binary_download_response = get(url, stream=True)
    with open(file_name, 'wb') as binary:
        for chunk in binary_download_response.iter_content(chunk_size=1024):
            if chunk:
                binary.write(chunk)


download_latest_release()

with subprocess.Popen(["ifconfig"], stdout=subprocess.PIPE) as proc:
    print(proc.stdout.read())
