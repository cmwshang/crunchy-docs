## PostgresOpen SV 2018 Web Site

THIS IS THE TESTING BRANCH

This site is built by using the PG.EU static deployment tool. Packages that are needed on a Debian system include:
```
python
python-jinja2
python-dateutil
```

## Preparation
First create the target directory and clone this repo and the PG.EU one from https://git.postgresql.org/gitweb/?p=pgeu-website.git;a=summary
```
WORKDIR="/path/to/your/workdir"
cd "${WORKDIR}"
git clone https://github.com/xenophenes/pgopen2018.git
git clone https://git.postgresql.org/git/pgeu-website.git
mkdir 2018.postgresopen.org
```

Create your own context.override.json by copying the context.json and adjusting
the values as necessary.  For example:
```
cd "${WORKDIR}/pgopen2018/templates"
cp context.json context.override.json
vi context.override.json
```

In context.override.json there is:
```
"linkbase": "https://2018.postgresopen.org/",
```

For deploying locally, you could change that to:
```
"linkbase": "file:///path/to/your/workdir/2018.postgresopen.org/",
```
The same goes for 'mediabase'. Also add this line to context.override.json following the mediabase line:
```
"githash": "",
```
## Deployment
Finally, run the following to deploy:
```
cd "${WORKDIR}"
# the next line not needed the first time deploying
rm -rf 2018.postgresopen.org/*
pgeu-website/tools/deploystatic/deploystatic.py $(pwd)/pgopen2018 $(pwd)/2018.postgresopen.org
```

The static website should be created into the 2018.postgresql.org directory.
