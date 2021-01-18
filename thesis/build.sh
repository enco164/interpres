cd ./src || exit

latexmk -shell-escape -pdf -xelatex matfmaster

cd - || exit
