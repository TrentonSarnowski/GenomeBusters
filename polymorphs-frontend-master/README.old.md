# GenomeBusters

Note: the following came from Big Bacillus readme.

## Polymorphs GeneViewer

This project is a continuation of the __Polymorph GeneViewer__ application, a
2017 senior design project for the BioMolecular Engineer Department at the
_Milwaukee School of Engineering_. Since the previous team took down their
repositories, the project had to be re-uploaded for continued improvements.

## Setup instructions

This project is setup to use vagrant for ease of maintenance and installation.
A manual installation can be completed as well if one wishes to run the project
on the local machine (such as on production servers).

### Vagrant Setup

This section assumes you have the following items installed on your machine:
__git, vagrant__

1. Ensure the system installation requirements listed above are met.
2. Setup the virtual machine by running ```vagrant up --provision```
3. Start all required servers by running ```.\start-all.cmd``` on the host
   machine.
4. Navigate to the website by going to ```localhost:3000/``` in a browser.

### Manual Setup

___Todo:___ This section should be filled out later. for now, view the
_vagrantfile_ for hints on manual setup.

## Contributions

| Team          | Affiliation              | Contribution                      | Year(s) |
|---------------|--------------------------|-----------------------------------|---------|
|_Polymorphs_   | MSOE Senior Design Team  | Frontend/Backend foundations      | 2017    |
|_Big Bacillus_ | MSOE Senior Design Team  | Antimicrobial Genetic Comparisons | 2018    |
 
## Original readme follows For the Polymorphs frontend:

### Polymorphs Frontend

This repository contains the code for the frontend of the GeneScape Viewer. The GeneScape viewer was a senior design project (2016-2017) with the goal of processing and/or identifying genes within given gene files. Furthermore, we tried to implement the viewer with a Google Maps "look and feel". To do this, we heavily relied on ReactJS and D3 for rendering the website. This project currently only processes genbank files (preset or uploaded) fetches the results from the [GeneScape API](https://github.com/euclideansphere/polymorphs).

The project is implemented in React, and was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


#### Getting Started

You can get started with these three steps.

```
git clone git@github.com:jakerobers/polymorphs-frontend.git && cd polymorphs-frontend
npm install
npm start
```


If you need to fetch the data from the API, please read the [instructions](https://github.com/euclideansphere/polymorphs/blob/master/README.md) for setting up the server.
