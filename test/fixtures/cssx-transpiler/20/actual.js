var obj = {
  styles: cssx(
    body {
      color: <% this.color %>;
      margin: 0;
      padding: 0;
      font-<%property%>: <% value %>px;
    }
    <% b(a+b).reduce(function () {
      return m;
    })%> {
      b-<% bar %>: something <% foo %> px <% bar %> s; 
    }
  ),
  color: '#FF0'
};