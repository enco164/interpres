cd ./src || exit

latexmk -pdf -xelatex matfmaster

cd - || exit
