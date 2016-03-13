var DefaultStyles = "var sheet = <style>\n\
  body {\n\
    margin: 0;\n\
    padding: 0;\n\
  }\n\
</style>\n\
\n\
var size = 10;\n\
var ratio = 1.5;\n\
\n\
sheet.add(\n\
  'p',\n\
  <style>{\n\
    font-size: {{ size }}px;\n\
    line-height: {{ size*ratio }}px;\n\
    (wmo)transform: transitionX(10px);\n\
  }</style>\n\
);";