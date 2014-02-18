exports.command = function(callback) {
    var client = this;
    var start = new Date().getTime();

    // Checks the jQuery.active property to see if an ajax request is
    // completed.
    return client.execute_async(
        function() { return $.active; },
        [],
        function(result) {
            console.log('result', result)
            var now = new Date().getTime();
            var msg = 'AJAX call completed after ' +
                (now - self.startTimer) + ' milliseconds.';

            // Assert that the evaluatedData object is present
            client.assert.notEqual(result.value, 0, msg);

            if (typeof callback === 'function') {
                callback.call(client, result);
            }
        }
    );

};