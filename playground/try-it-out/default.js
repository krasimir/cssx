var DefaultStyles = "var sheet = cssx();\n\nsheet.add(<style>\n\
  body {\n\
    margin: 0;\n\
    padding: 0;\n\
  }\n\
</style>);\n\
\n\
var size = 10;\n\
var ratio = 1.5;\n\
\n\
sheet.add(<style>\n\
  p {\n\
    font-size: {{ size }}px;\n\
    line-height: {{ size*ratio }}px;\n\
    transform: transitionX(10px);\n\
  }\n\
</style>);";