cssx(
  .left {
    margin: `value`px;
    background-image: `
      showImages.reduce(function(value, image) {
        value.push('site/imgs/' + value);
        return value;
      }, []).join(',')
    `;
    (wmo)animation: snow 10s linear infinite;
  }
)