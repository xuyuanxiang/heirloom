var CalculatorMixin = Base => class extends Base {
  calc() {
    console.log('calc');
  }
};

var RandomizerMixin = Base => class extends Base {
  randomize() {
    console.log('randomize');
  }
};

class Foo {
  foo() {
    console.log('foo');
  }
}

class Bar extends CalculatorMixin(RandomizerMixin(Foo)) {

}

let bar = new Bar();
bar.randomize(); // 'randomize'
bar.calc(); // 'calc'
bar.foo(); //  'foo'
