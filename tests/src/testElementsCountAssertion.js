
module.exports = {
    setUp: function (callback) {
        this.client = require('../../nightwatch.js').init();

        callback();
    },

    'Elements Count items found message is correct' : function(test) {
        var assertionFn = require('../../assertions/elementsCount.js');

        var client = {
            options : {},
            api: {
                elements: function(selectorStrategy, selector, callback) {
                    test.equals(selectorStrategy, 'css selector');
                    test.equals(selector, '.some-parent .with-children');
                    callback({
                        status: 0,
                        value : [
                            { ELEMENT: '6' },
                            { ELEMENT: '7' },
                            { ELEMENT: '8' },
                            { ELEMENT: '9' },
                            { ELEMENT: '10' },
                            { ELEMENT: '11' }
                        ]
                    });
                }
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result, 6);
                test.equals(expected, 6);
                test.equals(msg, 'Testing if the count for the element <.some-parent .with-children> is 6.');
                test.equals(abortOnFailure, true);
                delete Assertion;
                test.done();
            }
        };

        var m = Api.createAssertion('elementsCount', assertionFn, true, this.client);
        m._commandFn('.some-parent .with-children', 6);
    },

    'Elements Count no items found messaging is correct' : function(test) {
        var assertionFn = require('../../assertions/elementsCount.js');
        var client = {
            options: {},
            api: {
                elements : function(selectorStrategy, selector, callback) {
                    test.equals(selectorStrategy, 'css selector');
                    test.equals(selector, '.notfound');
                    callback({
                        status: -1,
                        value : []
                    });
                }
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, false);
                test.equals(result, null);
                test.equals(expected(), 0);
                test.equals(msg, 'Testing if the count for the element <.notfound> is 0. ');
                test.equals(abortOnFailure, true);
                delete Assertion;
                test.done();
            }
        };

        var m = Api.createAssertion('elementsCount', assertionFn, true, this.client);
        m._commandFn('.notfound', 0);
    },

    tearDown : function(callback) {
        callback();
    }
};
