* Make sure that the playground doesn't freeze with the following
```
var body = cssx(
  @media print |<-------- here is where the playground freezes
  body { 
    margin: 30px;
  }
);
body.nested('p', { a: 1 });
```

* Documentation
* A complete end-to-end test suite
* Examples in the playground
* Better distribution of client and transpiler
* Provide jsbin
* Example of cssx-at-runtime