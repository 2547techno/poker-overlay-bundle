#!/bin/bash
if [ $# -lt 1 ]
then
    echo "No args given!"
    exit
fi

for i in "$@"
do
    REPLACE="s/\[\[ID\]\]/${i}/g"
    echo "Creating $i.html [...]"
    cp player.html.template $i.html
    sed -i $REPLACE $i.html
done