describeAPI(function() {

    it('тест get_obama_years', function (done) {
        application.server.post('get_obama_years', function (response) {
            expect(response.result).toBe(53);
            done();
        });
    });

});