#!/bin/bash
echo $1
if [ $# -lt 1 ]
then
    echo "No args given!"
    exit
fi

for i in "$@"
do
    REPLACE="s/\[\[ID\]\]/${i}/g"
    echo "Creating $i-hand.html [...]"
    cp hand.html.template $i-hand.html
    sed -i $REPLACE $i-hand.html
    echo "Creating $i-chips.html [...]"
    cp chips-bet.html.template $i-chips-bet.html
    sed -i $REPLACE $i-chips-bet.html
    echo "Creating $i-balance.html [...]"
    cp chips-balance.html.template $i-chips-balance.html
    sed -i $REPLACE $i-chips-balance.html
done