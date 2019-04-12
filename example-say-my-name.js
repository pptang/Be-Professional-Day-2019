var heisenberg = {
  name: 'Paipo',
  sayMyName: function () {
    return this.name;
  }
}

var sayMyName = heisenberg.sayMyName.bind(heisenberg);

console.log(sayMyName());