@app
arc-test

@shared

@views

@http
get /
get /about
get /notes

get /notes/:noteID

@tables
notes
  noteID *String

@aws
# profile default
region us-west-2
architecture arm64