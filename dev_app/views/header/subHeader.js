directory.subHeader = Backbone.View.extend({
    data: {},
    initialize: function () {
        this.render();
    },
    render: function (opt) {
        var self = this;
        var isMySchoolDetail = false;
        var isAirMultiSensor = false;
        var isAdmin = true;

        if(window.location.hash == "#mySchoolDetail"){
            isMySchoolDetail = true;
        } else if (window.location.hash == "#schoolDetail"){
            isAirMultiSensor = true;
        }
        self.data.isMySchoolDetail = isMySchoolDetail;
        self.data.isAirMultiSensor = isAirMultiSensor;

        self.data.userSchId = App.vars.userSchId;
        self.data.lv = App.vars.lv;
        self.data.cls = App.vars.cls;

        if (
            App.vars.schCd === undefined ||
            App.vars.schCd === '' ||
            App.vars.schCd === null

        ) {
            isAdmin = false;
        }

        $('.wrap_header').html(templete["header/subHeader"](self.data)).addClass('wrap_header_bd');

        if (isAdmin === false) {
            $('.wrap_header').find('._registerMySchool').show();
            $('._registerMySchool').prop('checked', true);
        } else if (isAdmin === true) {
            $('.wrap_header').find('._registerMySchool').hide();
        }

        return this;
    }
});