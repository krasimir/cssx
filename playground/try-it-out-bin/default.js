var DefaultStyles = "var sheet = cssx(\n\
  body {\n\
    margin: 0;\n\
    padding: 0;\n\
  }\n\
);\n\
\n\
var size = 10;\n\
var ratio = 1.5;\n\
\n\
sheet.add('p', cssx({\n\
  font-size: `size`px;\n\
  line-height: `size*ratio`px;\n\
  (wmo)transform: transitionX(10px);\n\
}));";