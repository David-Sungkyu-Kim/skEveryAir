directory.device_winiaHumiditySettingAlarm = Backbone.View.extend({
    initialize: function () {
        this.render();
    },
    render: function (data) {
        this.$el.html(templete["device_winiaHumidity/settingAlarm"](data));
        return this;
    }
});