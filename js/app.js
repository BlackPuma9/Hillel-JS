'use strict';

(function () {
    const cat = {
        name: 'Busia',
        surname: 'Kote',
    };

    const dog = {
        name: 'Biba',
        surname: 'Boba',
    };

    function printFullName(age) {
        console.log(`Hi! I am ${this.name} ${this.surname} and I have ${age}`);
    }

    function bind(func, context, ...rest) {
        return function (...args) {
            context.addFunc = func;
            const cumulatedArg = rest.concat(args);
            const result = context.addFunc(...cumulatedArg);
            delete context.addFunc;
            return result;
        };
    }

    bind(printFullName, cat, 10)();
    bind(printFullName, cat)(2);
    bind(printFullName, dog, 7)();
})();
