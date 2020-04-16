module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'simple-import-sort'],
  // add your custom rules here
  rules: {
    // This rule disallows calls to methods of the 'console' object.
    'no-console': 'warn',

    // This rule is aimed at eliminating unused variables, functions, and function parameters.
    'no-unused-vars': ['error', { varsIgnorePattern: '' }],

    // This rule is aimed at discouraging the use of 'var' and encouraging the use of 'const' or
    // 'let' instead.
    'no-var': 'error',

    // This rule enforces a consistent indentation style.
    indent: ['error', 2],

    // This rule reports the regular expressions which include multiple code point characters in
    // character class syntax.
    'no-misleading-character-class': 'error',

    // This rule aims to report assignments to variables or properties where all of the following
    // are true:
    // * A variable or property is reassigned to a new value which is based on its old value.
    // * A 'yield' or 'await' expression interrupts the assignment after the old value is read, and
    //   before the new value is set.
    // * The rule cannot easily verify that the assignment is safe (e.g. if an assigned variable is
    //   local and would not be readable from anywhere else while the function is paused).
    'require-atomic-updates': 'error',

    // This rule finds callback functions of the array methods, then checks usage of 'return'
    // statement.
    'array-callback-return': 'error',

    // This rule requires 'return' statements to either always or never specify values.
    'consistent-return': 'error',

    // This rule is aimed at preventing bugs and increasing code clarity by ensuring that block
    // statements are wrapped in curly braces.
    curly: ['error', 'all'],

    // This rule is aimed at maintaining code consistency and improving code readability by
    // encouraging use of the dot notation style whenever possible. As such, it will warn when it
    // encounters an unnecessary use of square-bracket notation.
    'dot-notation': 'error',

    // This rule is aimed at eliminating the type-unsafe equality operators.
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    // This rule is aimed at highlighting an unnecessary block of code following an 'if' containing
    // a return statement. As such, it will warn when it encounters an 'else' following a chain of
    // 'if's, all of them containing a return statement.
    'no-else-return': 'error',

    // This rule is aimed at eliminating empty functions. A function will not be considered
    // a problem if it contains a comment.
    'no-empty-function': 'error',

    // Disallow unnecessary function binding.
    'no-extra-bind': 'error',

    // This rule is aimed at eliminating unnecessary labels.
    'no-extra-label': 'error',

    // This rule is aimed at eliminating floating decimal points and will warn whenever a numeric
    // value has a decimal point but is missing a number either before or after it.
    'no-floating-decimal': 'error',

    // This rule aims to eliminate implied 'eval()' through the use of 'setTimeout()',
    // 'setInterval()' or 'execScript()'. As such, it will warn when either function is used with
    // a string as the first argument.
    'no-implied-eval': 'error',

    // This rule aims to eliminate unnecessary and potentially confusing blocks at the top level of
    // a script or within other blocks.
    'no-lone-blocks': 'error',

    // This rule disallows any function within a loop that contains unsafe references
    // (e.g. to modified variables from the outer scope).
    'no-loop-func': 'error',

    // Comparing a variable against itself is usually an error, either a typo or refactoring error.
    'no-self-compare': 'error',

    // This rule forbids the use of the comma operator, with the following exceptions:
    // * In the initialization or update portions of a for statement.
    // * If the expression sequence is explicitly wrapped in parentheses.
    'no-sequences': 'error',

    // This rule is aimed at maintaining consistency when throwing exception by disallowing to
    // throw literals and other expressions which cannot possibly be an errorLevel('Error') object.
    'no-throw-literal': 'error',

    // This rule finds references which are inside of loop conditions, then checks the variables of
    // those references are modified in the loop.
    'no-unmodified-loop-condition': 'error',

    // This rule aims to eliminate unused expressions which have no effect on the state of the
    // program.
    'no-unused-expressions': 'error',

    // This rule is aimed to flag usage of Function.prototype.call() and Function.prototype.apply()
    // that can be replaced with the normal function invocation.
    'no-useless-call': 'error',

    // This rule aims to flag the concatenation of 2 literals when they could be combined into
    // a single literal.
    'no-useless-concat': 'error',

    // This rule aims to report redundant 'return' statements.
    'no-useless-return': 'error',

    // This rule aims to ensure that Promises are only rejected with errorLevel('Error') objects.
    'prefer-promise-reject-errors': 'error',

    // This rule warns async functions which have no await expression.
    'require-await': 'error',

    // This rule aims to eliminate shadowed variable declarations.
    'no-shadow': 'error',

    // This rule will warn when it encounters a reference to an identifier that has not yet been
    // declared.
    // 'functions': The flag which shows whether or not this rule checks function declarations.
    // Function declarations are hoisted, so it’s safe.
    'no-use-before-define': ['error', { functions: false }],

    // This rule enforces consistent brace style for blocks.
    // '1tbs' example: if (foo) {
    //    bar();
    //  }
    'brace-style': ['error', '1tbs'],

    // This rule looks for any underscores (_) located within the source code. It ignores leading
    // and trailing underscores and only checks those in the middle of a variable name.
    // If ESLint decides that the variable is a constant (all uppercase), then no warning will be
    // thrown.
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],

    // This rule enforces two things about variables with the designated alias names for 'this':
    // * If a variable with a designated name is declared, it must be either initialized (in the
    //   declaration) or assigned (in the same scope as the declaration) the value 'this'.
    // * If a variable is initialized or assigned the value 'this', the name of the variable must be
    //   a designated alias.
    'consistent-this': ['error', 'self'],

    // This rule disallows 'if' statements as the only statement in 'else' blocks.
    'no-lonely-if': 'error',

    // This rule disallows mixes of different operators without parentheses
    'no-mixed-operators': 'off',

    // This rule aims to reduce the scrolling required when reading through your code. It will warn
    // when the maximum amount of empty lines (2) has been exceeded.
    'no-multiple-empty-lines': 'error',

    // This rule disallows negated conditions in either of the following:
    // * if statements which have an else branch
    // * ternary expressions
    'no-negated-condition': 'error',

    // This rule requires quotes around object literal property names.
    // 'as-needed': disallows quotes around object literal property names that are not strictly
    // required
    'quote-props': ['error', 'as-needed'],

    // This rules requires that all imports from a single module exists in a single import
    // statement.
    'no-duplicate-imports': 'error',

    // This rule disallows unnecessary usage of computed property keys (example: { ['a']: 'b' }).
    'no-useless-computed-key': 'error',

    // This rule enforces the use of the shorthand syntax ({ fn() {} } instead of
    // { fn: function () {} }). This applies to all methods (including generators) defined in
    // object literals and any properties defined where the key name matches name of the assigned
    // variable.
    'object-shorthand': 'error',

    // This rule is aimed at flagging variables that are declared using let keyword, but never
    // reassigned after the initial assignment.
    'prefer-const': 'error',

    // This rule is aimed to flag usage of Function.prototype.apply() in situations where
    // the spread operator could be used instead.
    'prefer-spread': 'error',

    // This rule is aimed to flag usage of + operators with strings.
    'prefer-template': 'error',

    // Sorted imports
    'import/order': 'off',
    'simple-import-sort/sort': 'error',
  },
};
