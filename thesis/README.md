Za pisanje master teze u `.tex` formatu korišćen je predlog šablona http://www.matf.bg.ac.rs/~filip/teze.zip, 
uz sitne izmene (npr. koriscenje `minted` paketa za formatiranje koda)

Za pisanje latex se koristi [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop) ekstenzija za Visual Studio Code. Ova ekstenzija koristi Docker image za LaTeX kompilator. `minted` paket zahteva instalaciju `python-pygments`. Zbog toga postoji specijalan Dockerfile u kome je instaliran dodatni paket. Potrebno je izgraditi docker image komandom 
```
docker build -t enco164/thesis-latex:1.0
```

Podesavanja (`settings.json`) za VS Code:

```
    "latex-workshop.docker.enabled": true,
    "latex-workshop.latex.outDir": "./out",
    "latex-workshop.synctex.afterBuild.enabled": true,
    "latex-workshop.view.pdf.viewer": "tab",
    "latex-workshop.docker.image.latex": "enco164/thesis-latex:1.0",
    "latex-workshop.latex.tools": [
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-xelatex",
                "--shell-escape", // added arg to default
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "%DOC%"
            ]
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "--shell-escape", // added arg to default
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ]
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
                "%DOCFILE%"
            ]
        }
    ]
```


