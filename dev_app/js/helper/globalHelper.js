Handlebars.registerHelper("airStateColor", function (airGrd ,connStatYn ,status) {
    var airStateColor;

    if(connStatYn === "N"){
        airStateColor = "no_respond";
    } else {
        if (status === "off") {
            airStateColor = "off"
        } else {
            switch (airGrd) {
                case "매우좋음" :
                    airStateColor = "best";
                    break;
                case "좋음" :
                case "청정" :
                    airStateColor = "good";
                    break;
                case "보통" :
                case "저오염" :
                    airStateColor = "normal";
                    break;
                case "나쁨" :
                    airStateColor = "bad";
                    break;
                case "중오염" :
                    airStateColor = "harm";
                    break;
                case "매우나쁨" :
                case "고오염" :
                    airStateColor = "worse";
                    break;
                case "측정중" :
                case "" :
                case "-":
                    airStateColor = "no_respond";
                    break;
                default :
                    airStateColor = "default";
                    break
            }
        }
    }

    return airStateColor;
});

Handlebars.registerHelper("awairAirStateColor", function (value ,connStatYn ,status) {
    var airStateColor;

    if(connStatYn === "N"){
        airStateColor = "no_respond";
    } else {
        if (status === "off") {
            airStateColor = "off"
        } else {
            switch (value) {
                case "green" :
                    airStateColor = "normal";
                    break;
                case "amber" :
                    airStateColor = "bad";
                    break;
                case "red" :
                    airStateColor = "worse";
                    break;
                case "측정중" :
                case "" :
                case "-":
                    airStateColor = "no_respond";
                    break;
                default :
                    airStateColor = "default";
                    break
            }
        }
    }

    return airStateColor;
});


Handlebars.registerHelper("cleanerStatus", function (data) {
    var cleanerStatus;
    switch (data) {
        case "01" :
            cleanerStatus = "good";
            break;
        case "02" :
            cleanerStatus = "normal";
            break;
        case "03" :
            cleanerStatus = "bad";
            break;
        case "04" :
            cleanerStatus = "worse";
            break;
    }
    return cleanerStatus;
});

Handlebars.registerHelper("airCircleColor", function (airGrd ,connStatYn , status) {

    var airCircleColor;

    if(connStatYn === "N"){
        airCircleColor = "sprite_network_error";
    }else {
        if (status === "off") {
            airCircleColor = "default";
        } else {
            switch (airGrd) {
                case "매우좋음" :
                case "좋음" :
                case "청정" :
                    airCircleColor = "blue";
                    break;
                case "보통" :
                case "저오염" :
                    airCircleColor = "green";
                    break;
                case "나쁨" :
                    airCircleColor = "orange";
                    break;
                case "중오염" :
                    airCircleColor = "purple";
                    break;
                case "매우나쁨" :
                case "고오염" :
                    airCircleColor = "red";
                    break;
                case "측정중" :
                case "" :
                case "-" :
                    airCircleColor = "sprite_network_error";
                    break;
                default :
                    airCircleColor = "default";
                    break;
            }
        }
    }

    return airCircleColor;

});

Handlebars.registerHelper("responseAirGrd", function ( airGrd ,connStatYn, status) {
    var airStateText;

    if(connStatYn === "N"){
        airStateText = "미응답";
    } else  {
        if (status === "off") {
            airStateText = "OFF";
        } else {
            if(airGrd === ""){
                airStateText = "-";
            } else{
                airStateText = airGrd ;
            }
        }
    }

    return airStateText;
});


Handlebars.registerHelper("airStateText", function (data) {
    var airStateText;
    switch (data) {
        case "1" :
            airStateText = "좋음";
            break;
        case "2" :
            airStateText = "보통";
            break;
        case "3" :
            airStateText = "나쁨";
            break;
        case "4" :
            airStateText = "매우나쁨";
            break;
    }
    return airStateText;
});
Handlebars.registerHelper("subHeaderTitle", function (data) {
    var subHeaderTitle;
    switch (window.location.hash) {
        case "#searchSchool" :
            subHeaderTitle = "학교 검색";
            break;
        case "#mySchoolDetail" :
            subHeaderTitle = App.vars.sSelectedSchoolTitle;
            break;
        case "#historyAlarm" :
            subHeaderTitle = "이력 및 알림";
            break;
        case "#airReport" :
            subHeaderTitle = "공기 리포트";
            break;
        case "#informationDetail" :
            subHeaderTitle = "정보";
            break;
        case "#airMultiSensor":
        case "#airPurifier" :
        case "#schoolDetail" :
            subHeaderTitle = App.vars.sSelectedSchoolTitle + App.vars.sSelectedLvClass;
            break;
        case "#localeList":
            subHeaderTitle = "학교 검색";
            break;

    }
    return subHeaderTitle;
});

Handlebars.registerHelper("iconLocaleMap", function (data) {
    var headerIcon;
    if (data.data.root == "localeList") {
        headerIcon = "sprite_map";
    } else {
        headerIcon = "sprite_toggle_list";
    }
    return headerIcon;
});
Handlebars.registerHelper("headerLocation", function (data) {
    var headerLocation;
    if (data.data.root == "localeList") {
        headerLocation = "#home";
    } else {
        headerLocation = "#localeList";
    }
    return headerLocation;
});

Handlebars.registerHelper("innerEach", function (array, index, options) {
    console.log("===============>", array);
    console.log("===============> index", index);
    var lvData;
    for (var i = 0; i < array[index]; i++) {
        if (i == 0) {
            return
        }
    }
    /*  if(index == 0 ||array[index].lv != array[index - 1].lv) {
          return options.fn(this);
      } else if(index != 0 && array[index].lv == array[index - 1].lv){
          return options.inverse(this);
      }*/
});

Handlebars.registerHelper("isClass", function (level, options) {
    if (level > 6) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper("deviceCode", function (dvcCd, options) {
    // console.log(dvcCd)
    if (dvcCd === "DVC0000186") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("deviceKindCode", function (dvcKindCd, options) {
    if (dvcKindCd === "012") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper("isPower", function (fncCd, options) {
    if (fncCd === "D03") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

Handlebars.registerHelper("isMode", function (fncCd, options) {
    if (fncCd === "D05") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isVolume", function (fncCd, options) {
    if (fncCd === "D19") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

Handlebars.registerHelper("isPlasmaWave", function (fncCd, options) {
    if (fncCd === "D20") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isChildLock", function (fncCd, options) {
    if (fncCd === "D04") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isUV", function (fncCd, options) {
    if (fncCd === "D256") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isPollutionLamp", function (fncCd, options) {
    if (fncCd === "D257") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isPurifySignLamp", function (fncCd, options) {
    if (fncCd === "D252") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isRemoveVirus", function (fncCd, options) {
    if (fncCd === "D253") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isIon", function (fncCd, options) {
    if (fncCd === "D135") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isHumidfy", function (fncCd, options) {
    if (fncCd === "D101") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isDeodorizationFilter", function (fncCd, options) {
    if (fncCd === "D103") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper("isHepaFilter", function (fncCd, options) {
    if (fncCd === "D104") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper("isBioFilter", function (fncCd, options) {
    if (fncCd === "D216") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isFilterused", function (fncCd, options) {


    if (fncCd === ("D103"||"D216"||"D104")){
        return options.fn(this);
    } else {
        return options.inverse(this);
    }



});


Handlebars.registerHelper("isAlarm", function (actMsg, options) {

    if (actMsg != undefined) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});


Handlebars.registerHelper("isDustSensor", function (fncCd, options) {
    if (fncCd === "D134") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});


/**
 * 에어 정보
 */


Handlebars.registerHelper("isAirTemp", function (fncCd, options) {
    if (fncCd === "D247") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper("isAirHumi", function (fncCd, options) {
    if (fncCd === "D18") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper("isAirDust", function (fncCd, options) {
    if (fncCd === "D102") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper("isAirFineDust", function (fncCd, options) {
    if (fncCd === "D249") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isAirCo2", function (fncCd, options) {
    if (fncCd === "D232") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isVoc", function (fncCd, options) {
    if (fncCd === "D233") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isFavor", function (fncCd, options) {
    if (fncCd === "D248") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


Handlebars.registerHelper("isOn", function (fncVal, options) {
    if (fncVal === "on" || fncVal === "ON") {
        return "checked"
    }
});
Handlebars.registerHelper("isSameFocus", function (fncVal, val, options) {
    if (fncVal == val) {
        return 'focus';
    }
});


/*Handlebars.registerHelper("greenStatusIconClass", function (fncCd, fncVal, options) {
    var className;
    if(fncCd === "D247"){
        var temperature = fncVal;
        var temperatureGrade = App.view.schoolDetail.getGradeStartBySelectedNum(14,32,19,29,21,27,temperature);
        switch (temperatureGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }
        return className;

    } else if(fncCd === "D18"){
        var humidity = fncVal;
        var humidityGrade = App.view.schoolDetail.getGradeStartBySelectedNum(19,81,29,71,39,61,humidity);
        switch (humidityGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }
        return className;
    } else if(fncCd === "D102"){
        var microDust = fncVal;
        var microDustGrade = App.view.schoolDetail.getGradeStartByZero(150,80,30,microDust);
        switch (microDustGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }
        return className;

    } else if(fncCd === "D249"){
        var nanoDust  = fncVal ;
        var nanoDustGrade = App.view.schoolDetail.getGradeStartByZero(100,50,15,nanoDust);
        switch (nanoDustGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }
        return className;

    } else if(fncCd === "D233"){
        var chemical = fncVal;
        var chemicalGrade = App.view.schoolDetail.getGradeStartByZero(522,261,130,chemical);
        switch (chemicalGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }
        return className;
    } else if(fncCd === "D232"){
        var co2 = fncVal;
        var co2Grade = App.view.schoolDetail.getGradeStartByZero(2000,1000,650,co2);
        switch (co2Grade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }
        return className;
    } else if (fncCd == undefined || fncCd == ""){
        className = "sprite_air_error";
        return className;
    }
    //var airQualityGrade = [temperatureGrade,humidityGrade,chemicalGrade,co2Grade,microDustGrade,nanoDustGrade];

    /!*airQualityGrade.forEach(function (array,value, index) {

    });*!/

});*/


Handlebars.registerHelper("greenTempStatusIconClass", function (fncCd, fncVal, options) {

    var tempFncArray = [];
    var tempFncCd = "";
    var tempFncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D247") {
            tempFncArray = a;
            tempFncCd = tempFncArray.fncCd;
            tempFncVal = tempFncArray.fncVal;
        }

    });

    var className;
    if(tempFncCd === "D247"){
        var temperature = tempFncVal;
        var temperatureGrade = App.view.schoolDetail.getGradeStartBySelectedNum(14,32,19,29,21,27,temperature);
        switch (temperatureGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("greenHumiStatusIconClass", function (fncCd, fncVal, options) {

    var humiFncArray = [];
    var humiFncCd = "";
    var humiFncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D18") {
            humiFncArray = a;
            humiFncCd = humiFncArray.fncCd;
            humiFncVal = humiFncArray.fncVal;
        }

    });

    var className;
    if(humiFncCd === "D18"){
        var humidity = humiFncVal;
        var humidityGrade = App.view.schoolDetail.getGradeStartBySelectedNum(19,81,29,71,39,61,humidity);
        switch (humidityGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("greenDustStatusIconClass", function (fncCd, fncVal, options) {

    var microDustFncArray = [];
    var microDustFncCd = "";
    var microDustFncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D102") {
            microDustFncArray = a;
            microDustFncCd = microDustFncArray.fncCd;
            microDustFncVal = microDustFncArray.fncVal;
        }

    });

    var className;
    if(microDustFncCd === "D102"){
        var microDust = microDustFncVal;
        var microDustGrade = App.view.schoolDetail.getGradeStartByZero(150,80,30,microDust);
        switch (microDustGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("greenFineDustStatusIconClass", function (fncCd, fncVal, options) {

    var nanoDustFncArray = [];
    var nanoDustFncCd = "";
    var nanoDustFncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D249") {
            nanoDustFncArray = a;
            nanoDustFncCd = nanoDustFncArray.fncCd;
            nanoDustFncVal = nanoDustFncArray.fncVal;
        }

    });

    var className;
    if(nanoDustFncCd === "D249"){
        var nanoDust = nanoDustFncVal;
        var nanoDustGrade = App.view.schoolDetail.getGradeStartByZero(100,50,15,nanoDust);
        switch (nanoDustGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("greenVocStatusIconClass", function (fncCd, fncVal, options) {

    var chemicalFncArray = [];
    var chemicalFncCd = "";
    var chemicalFncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D233") {
            chemicalFncArray = a;
            chemicalFncCd = chemicalFncArray.fncCd;
            chemicalFncVal = chemicalFncArray.fncVal;
        }

    });

    var className;
    if(chemicalFncCd === "D233"){
        var chemical = chemicalFncVal;
        var chemicalGrade = App.view.schoolDetail.getGradeStartByZero(522,261,130,chemical);
        switch (chemicalGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("greenCo2StatusIconClass", function (fncCd, fncVal, options) {

    var co2FncArray = [];
    var co2FncCd = "";
    var co2FncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D232") {
            co2FncArray = a;
            co2FncCd = co2FncArray.fncCd;
            co2FncVal = co2FncArray.fncVal;
        }

    });

    var className;
    if(co2FncCd === "D232"){
        var co2 = co2FncVal;
        var co2Grade = App.view.schoolDetail.getGradeStartByZero(2000,1000,650,co2);
        switch (co2Grade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("tempStatusIconClass", function (fncCd, fncVal, options) {

    var tempFncArray = [];
    var tempFncCd = "";
    var tempFncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D247") {
            tempFncArray = a;
            tempFncCd = tempFncArray.fncCd;
            tempFncVal = tempFncArray.fncVal;
        }

    });

    var className;
    if(tempFncCd === "D247"){
        var temperature = tempFncVal;
        var temperatureGrade = App.view.schoolDetail.getGradeStartBySelectedNum(14,32,19,29,21,27,temperature);
        switch (temperatureGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("humiStatusIconClass", function (fncCd, fncVal, options) {

    var humiFncArray = [];
    var humiFncCd = "";
    var humiFncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D18") {
            humiFncArray = a;
            humiFncCd = humiFncArray.fncCd;
            humiFncVal = humiFncArray.fncVal;
        }

    });

    var className;
    if(humiFncCd === "D18"){
        var humidity = humiFncVal;
        var humidityGrade = App.view.schoolDetail.getGradeStartBySelectedNum(19,81,29,71,39,61,humidity);
        switch (humidityGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("dustStatusIconClass", function (fncCd, fncVal, options) {

    var microDustFncArray = [];
    var microDustFncCd = "";
    var microDustFncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D102") {
            microDustFncArray = a;
            microDustFncCd = microDustFncArray.fncCd;
            microDustFncVal = microDustFncArray.fncVal;
        }

    });

    var className;
    if(microDustFncCd === "D102"){
        var microDust = microDustFncVal;
        var microDustGrade = App.view.schoolDetail.getGradeStartByZero(120,80,30,microDust);
        switch (microDustGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("fineDustStatusIconClass", function (fncCd, fncVal, options) {

    var nanoDustFncArray = [];
    var nanoDustFncCd = "";
    var nanoDustFncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D249") {
            nanoDustFncArray = a;
            nanoDustFncCd = nanoDustFncArray.fncCd;
            nanoDustFncVal = nanoDustFncArray.fncVal;
        }

    });

    var className;
    if(nanoDustFncCd === "D249"){
        var nanoDust = nanoDustFncVal;
        var nanoDustGrade = App.view.schoolDetail.getGradeStartByZero(100,34,15,nanoDust);
        switch (nanoDustGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("VocStatusIconClass", function (fncCd, fncVal, options) {

    var chemicalFncArray = [];
    var chemicalFncCd = "";
    var chemicalFncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D233") {
            chemicalFncArray = a;
            chemicalFncCd = chemicalFncArray.fncCd;
            chemicalFncVal = chemicalFncArray.fncVal;
        }

    });

    var className;
    if(chemicalFncCd === "D233"){
        var chemical = chemicalFncVal;
        var chemicalGrade = App.view.schoolDetail.getGradeStartByZero(1500,850,529,chemical);
        switch (chemicalGrade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});

Handlebars.registerHelper("Co2StatusIconClass", function (fncCd, fncVal, options) {

    var co2FncArray = [];
    var co2FncCd = "";
    var co2FncVal= "";

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D232") {
            co2FncArray = a;
            co2FncCd = co2FncArray.fncCd;
            co2FncVal = co2FncArray.fncVal;
        }

    });

    var className;
    if(co2FncCd === "D232"){
        var co2 = co2FncVal;
        var co2Grade = App.view.schoolDetail.getGradeStartByZero(3000,1000,500,co2);
        switch (co2Grade) {
            case "grade1" :
                className = "sprite_good";
                break;
            case "grade2" :
                className = "sprite_normal";
                break;
            case "grade3" :
                className = "sprite_bad";
                break;
            case "grade4" :
                className = "sprite_worse";
                break;
            case "" :
            case undefined :
                className = "sprite_air_error";
                break;
        }

    }else{
        className= "sprite_air_error";
    }
    return className;



});


Handlebars.registerHelper("airSlideStateText", function (data) {
    var airStateText;
    switch (data) {
        case "01" :
            airStateText = "좋음";
            break;
        case "02" :
            airStateText = "보통";
            break;
        case "03" :
            airStateText = "나쁨";
            break;
        case "04" :
            airStateText = "매우나쁨";
            break;
    }
    return airStateText;
});

Handlebars.registerHelper("colClass", function (data) {
    var size = $('.box_air_all ul li').length;
    return 'col' + size;
});

Handlebars.registerHelper("deviceDetailReferSendHm", function (data) {

    if(App.vars.oSchoolDetail.oDeviceOpr != undefined){
        var data = App.vars.oSchoolDetail.oDeviceOpr[0];
        if(data != undefined){
            if(data.sendHm != undefined){
                if(data.sendHm == ""){
                    return "";
                }else{
                    var sendHText;
                    var sendHm =  moment(data.sendHm, "HHmm").format("HH:mm");
                    var sendH =  moment(data.sendHm, "HHmm").format("HH");

                    if(sendH >11){
                        sendHText ="오후 ";
                    }else{
                        sendHText ="오전 ";
                    }
                    return sendHText + sendHm;
                }

            }else if (data.sendHm == undefined ){
                return "";
            }
        }
    }

});

Handlebars.registerHelper("bracket", function (dvcNickNm) {
    var dvcNickNm = dvcNickNm;

    return "[" + dvcNickNm + "]" ;

});

Handlebars.registerHelper("newAlarm", function (data) {

    if(App.vars.oSchoolDetail.oDeviceOpr != undefined) {
        var data = App.vars.oSchoolDetail.oDeviceOpr[0];

        if (data != undefined) {
            if (data.sendHm != undefined) {
                if (data.sendHm == "") {
                    return "";
                } else {
                    var now = moment().format('YYYY-MM-DDTHH:mm');
                    var alarmData = data.sendMd + data.sendHm;
                    var startTime = moment(alarmData, "YYYYMMDDHHmm").format('YYYY-MM-DDTHH:mm');
                    var endTime = moment(startTime, "YYYY-MM-DDTHH:mm").add(3, 'hour').format('YYYY-MM-DDTHH:mm');

                    if (moment(now).isBetween(startTime, endTime)) {
                        return '<span class="sprite sprite_common sprite_new">new</span>';
                    }
                }
            } else if (data.sendHm == undefined) {
                return "";
            }

        }
    }

});


Handlebars.registerHelper("deviceActMsg", function (data) {

    if(App.vars.oSchoolDetail.oDeviceOpr != undefined){

        var data = App.vars.oSchoolDetail.oDeviceOpr[0];

        if(data != undefined){
            if(data.actMsg != undefined){
                return data.actMsg;

            }

        }
    }


});



Handlebars.registerHelper("remove", function (fncVal) {

    var fncValPre = fncVal.split('.')[0];
    var fncValNext = fncVal.split('.')[1];

    if(fncValNext == 0){
        return fncValPre ;
    }else{
        return fncVal ;
    }


});

Handlebars.registerHelper("replaceNm", function (data) {
    var sFilterName;
    var sDvcCode = data.data.root.dvcCd;
    switch (sDvcCode){
        // 위닉스 XQ
        case "DVC0000186":
            sFilterName = "E필터_탈취/마이크로집진";
            break;
        // 위닉스 타워(위닉스 나이키)
        case "DVC0000173":
            sFilterName = "D필터_일체형";
            break;
        // 위닉스 ZeroPlus
        case "DVC0000203":
            sFilterName = "B필터_탈취/마이크로집진";
            break;
        // 위닉스 타이탄
        case "위닉스 타워":
            sFilterName = "D필터_일체형";
            break;
    }
    return sFilterName ;

});
Handlebars.registerHelper("fncValCheck", function (fncVal) {

    var fncVal = fncVal.split('.')[0];

    if(fncVal<11){
        return '<div class="box_filter_use filter_10">';
    }else{
        return '<div class="box_filter_use">';
    }

});
Handlebars.registerHelper("hiddenFilter", function (remainFilter) {
    if(remainFilter == "0.0"){
        return "hidden_filter";
    }
});
Handlebars.registerHelper("checkSenList", function (senVal, options) {

    if (senVal == "Y") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

Handlebars.registerHelper("isOutlist", function (data, options) {
    switch (data) {
        case "관측소":
            return options.inverse(this);
            break;
        default :
            return options.fn(this);
            break;
    }
});

// Handlebars.registerHelper("colClass", function (data) {
//     var size = $('.box_air_all ul li').length;
//     return 'col' + size;
// });



Handlebars.registerHelper("isDataPreAbs", function (data) {
    var dataText;
    if(data === "" || data == null ){
        dataText = "--";
    }else if(data.split('.')[1] == 00){
        dataText = data.split('.')[0]
    }else {
        dataText = data
    }
    return dataText;
});

Handlebars.registerHelper("checkSendHm", function (sendHm,data) {


    if(sendHm == "" || sendHm == undefined ){
        return "";
    }else{
        var sendHText;
        var sendHm =  moment(sendHm, "HHmm").format("HH:mm");
        var sendH =  moment(sendHm, "HHmm").format("HH");

        if(sendH >11){
            sendHText ="오후 ";
        }else{
            sendHText ="오전 ";
        }
        return sendHText + sendHm;
    }

});

Handlebars.registerHelper("checkSendMd", function (sendMd,data) {

    if(sendMd == "" || sendMd == undefined ){
        return "";
    }else{
        var sendMd =  moment(sendMd, "YYYYMMDD").format("MM월 DD일");

        return sendMd;
    }


});
Handlebars.registerHelper("deviceDetailReferDvcImgUrl", function (data) {
    return App.vars.oSchoolDetail.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].dvcImgUrl;
});

Handlebars.registerHelper("deviceDetailReferDvcBannerImgUrl", function (data) {
    return App.vars.oSchoolDetail.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].dvcBannerImgUrl;
});

Handlebars.registerHelper("dvcNick", function (data) {
    return App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].dvcNickNm;
});


Handlebars.registerHelper("checkTempFncVal", function (fncVal) {

    var temp = "";
    var tempArray = [];

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D247") {
            tempArray = a;
        }

    });

    if(tempArray.fncCd !== undefined){
        temp = tempArray.fncVal.split('.')[0] + '<em>℃</em>';

    }else if (tempArray.fncCd === undefined){
        if(tempArray.fncVal === "" || tempArray.fncVal == null){
            temp = "-";
        }
    }

    return temp;

});


Handlebars.registerHelper("checkHumiFncVal", function (fncVal) {


    var humi = "";
    var humiArray = [];

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D18") {
            humiArray = a;
        }

    });

    if(humiArray.fncCd !== undefined){
        humi = humiArray.fncVal.split('.')[0] + '<em>%</em>';

    }else if (humiArray.fncCd === undefined){
        if(humiArray.fncVal === "" || humiArray.fncVal == null){
            humi = "-";
        }else{
            humi = "-";
        }
    }

    return humi;

});


Handlebars.registerHelper("checkDustFncVal", function (fncVal) {


    var dust = "";
    var dustArray = [];

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D102") {
            dustArray = a;
        }

    });

    if(dustArray.fncCd !== undefined){
        dust = dustArray.fncVal.split('.')[0] + '<em>㎍/㎥</em>';

    }else if (dustArray.fncCd === undefined){
        if(dustArray.fncVal === "" || dustArray.fncVal == null){
            dust = "-";
        }else{
            dust = "-";
        }
    }

    return dust;

});


Handlebars.registerHelper("checkFineDustFncVal", function (fncVal) {

    var fineDust = "";
    var fineDustArray = [];

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D249") {
            fineDustArray = a;
        }

    });

    if(fineDustArray.fncCd !== undefined){
        fineDust = fineDustArray.fncVal.split('.')[0] + '<em>㎍/㎥</em>';

    }else if (fineDustArray.fncCd === undefined){
        if(fineDustArray.fncVal === "" || fineDustArray.fncVal == null){
            fineDust = "-";
        }else{
            fineDust = "-";
        }
    }

    return fineDust;

});


Handlebars.registerHelper("checkVocFncVal", function (fncVal) {


    var Voc = "";
    var VocArray = [];

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D233") {
            VocArray = a;
        }

    });

    if(VocArray.fncCd !== undefined){
        Voc = VocArray.fncVal.split('.')[0] + '<em>PPM</em>';

    }else if (VocArray.fncCd === undefined){
        if(VocArray.fncVal === "" || VocArray.fncVal == null){
            Voc = "-";
        }else{
            Voc = "-";
        }
    }

    return Voc;


});

Handlebars.registerHelper("checkCo2FncVal", function (fncVal) {

    var Co2 = "";
    var Co2Array = [];

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D232") {
            Co2Array = a;
        }

    });

    if(Co2Array.fncCd !== undefined){
        Co2 = Co2Array.fncVal.split('.')[0] + '<em>PPM</em>';

    }else if (Co2Array.fncCd === undefined){
        if(Co2Array.fncVal === "" || Co2Array.fncVal == null){
            Co2 = "-";
        }else{
            Co2 = "-";
        }
    }

    return Co2;


});




Handlebars.registerHelper("deviceDetailReferDvcGuideUrl", function (data) {
    return App.vars.oSchoolDetail.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].dvcGuideUrl;
});

Handlebars.registerHelper("deviceFilter", function (data) {
    console.log(data)
});

Handlebars.registerHelper("lgDeviceCheck", function (data,options) {
    if (data === "DVC0000241") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("chunghoDeviceCheck", function (data,options) {
    if (data === "DVC0000137") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("samsungDeviceCheck", function (data,options) {
    if (data === "DVC0000182") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("winixDeviceCheck", function (data,options) {
    if (data === "DVC0000203" || data === "DVC0000173") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("winixXqDeviceCheck", function (data,options) {
    if (data === "DVC0000186") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("awairDeviceCheck", function (data,options) {
    if (data === "DVC0000185") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("sensorDeviceCheck", function (data,options) {
    if (data === "DVC0000204" || data === "DVC0001350") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


Handlebars.registerHelper("schListCheck", function (schList, options) {
    if (schList == undefined || schList.length == 0 ) {
        return options.fn(this);
    } else  {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("homeUseHour", function (data) {

    var data = App.vars.oSchoolDetail;

    if(data != undefined){
        if(data.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].homeUseHour != undefined){
            if(data.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].homeUseHour == ""){
                return "";
            }else{
                return data.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].homeUseHour;
            }
        }else if (data.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].homeUseHour == undefined ){
            return "";
        }
    }
});

Handlebars.registerHelper("otherUseHour", function (data) {

    var data = App.vars.oSchoolDetail;

    if(data != undefined){
        if(data.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].otherUseHour != undefined){
            if(data.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].otherUseHour == ""){
                return "";
            }else{
                return data.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].otherUseHour;
            }
        }else if (data.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].otherUseHour == undefined ){
            return "";
        }
    }
});

Handlebars.registerHelper("moment", function (data) {

    var week = new Array('일', '월', '화', '수', '목', '금', '토');
    var today = new Date().getDay();
    var todayLabel = week[today];
    var now = moment().format('YYYY.MM.DD')

    return now + '('+todayLabel+')' ;
});


Handlebars.registerHelper("deviceDetailReferCallCenterInfoUrl", function (data) {
    return App.vars.oSchoolDetail.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].callCenterInfoUrl;
});

Handlebars.registerHelper("fncInfoCheck", function (fncInfo , connStatYn) {

    var fncInfoText;

    if(connStatYn === "N"){
        fncInfoText = "-";
    }else{
        if(fncInfo === "" || fncInfo == null){
            fncInfoText = "-";
        }else {
            fncInfoText = fncInfo;
        }

    }

    return fncInfoText;
});


Handlebars.registerHelper("awairFncValCheck", function (connStatYn) {

    var fncVal = "";
    var fncValArray = [];

    if(connStatYn === "N"){
        fncVal = "-";
    }else {
        App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i) {
            if (a.fncCd === "D238") {
                fncValArray = a;
            }
        });

        if (fncValArray.length == 0) {
            fncVal = "-";
        } else if (fncValArray.length != 0) {
            if (fncValArray.fncVal === "" || fncValArray.fncVal == null) {
                fncVal= "-";
            } else {
                fncVal = fncValArray.fncVal;
            }

        }
    }

    return fncVal;
});

Handlebars.registerHelper("sensorFncValCheck", function (connStatYn) {

    var fncVal = "";
    var fncValArray = [];

    if(connStatYn === "N"){
        fncVal = "-";
    }else {
        App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i) {
            if (a.fncCd === "D318") {
                fncValArray = a;
            }
        });

        if (fncValArray.length == 0) {
            fncVal = "-";
        } else if (fncValArray.length != 0) {
            if (fncValArray.fncVal === "" || fncValArray.fncVal == null) {
                fncVal= "-";
            } else {
                fncVal = fncValArray.fncVal;
            }

        }
    }

    return fncVal;
});


Handlebars.registerHelper("isTemp", function (temp , connStatYn) {

    var tempText;

    if(connStatYn === "N"){
        tempText = "-";
    }else {
        if (temp === "" || temp == null) {
            tempText = "-";
        } else {
            tempText = temp;
        }
    }
    return tempText;
});

Handlebars.registerHelper("isHmdt", function (hmdt , connStatYn) {

    var hmdtText;

    if(connStatYn === "N"){
        hmdtText = "-";
    }else {
        if (hmdt === "" || hmdt == null) {
            hmdtText = "-";
        } else {
            hmdtText = hmdt;
        }
    }
    return hmdtText;
});

Handlebars.registerHelper("isDataMicro", function (pm10 , connStatYn) {

    var pm10Text;

    if(connStatYn === "N"){
        pm10Text = "-";
    }else {

        if (pm10 === "" || pm10 == null) {
            pm10Text = "-";
        } else {
            pm10Text = pm10;
        }
    }
    return pm10Text;
});

Handlebars.registerHelper("isDataTemp", function (connStatYn) {

    var temp = App.vars.oSchoolDetail.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].temp;
    var tempText;

    if(connStatYn === "N"){
        tempText = "-";
    }else {
        if (temp === "" || temp == null) {
            tempText = "-";
        } else {
            tempText = temp;
        }
    }
    return tempText;
});

Handlebars.registerHelper("isDataHmdt", function (connStatYn) {
    var hmdt = App.vars.oSchoolDetail.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].hmdt;
    var hmdtText;

    if(connStatYn === "N"){
        hmdtText = "-";
    }else {
        if (hmdt === "" || hmdt == null) {
            hmdtText = "-";
        } else {
            hmdtText = hmdt;
        }
    }
    return hmdtText;

});

Handlebars.registerHelper("isOutDataMicro", function (connStatYn) {
    var pm10 = App.vars.oSchoolDetail.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].pm10;
    var pm10Text;

    if(connStatYn === "N"){
        pm10Text = "-";
    }else {
        if (pm10 === "" || pm10 == null) {
            pm10Text = "-";
        } else {
            pm10Text = pm10;
        }
    }
    return pm10Text;

});

Handlebars.registerHelper("isOutFncInfo", function (fncInfo, connStatYn) {
    // var fncInfo = App.vars.oSchoolDetail.oDeviceInfoRoot[App.vars.oSchoolDetail.nIdx].fncInfo;
    var fncInfoText;

    if(connStatYn === "N"){
        fncInfoText = "-";
    }else {
        if (fncInfo === "" || fncInfo == null) {
            fncInfoText = "-";
        } else {
            fncInfoText = fncInfo;
        }
    }
    return fncInfoText;

});

Handlebars.registerHelper("isDataGas", function (connStatYn) {
    var gas = "";
    var gasArray = [];

    App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i){
        if(a.fncCd === "D136"){
            gasArray = a;
        }
    });

    if(gasArray.length == 0){
        gas = "-";
    }else if (gasArray.length != 0){
        if(gasArray.fncVal === "" || gasArray.fncVal == null){
            gas= "-";
        }else{
            gas = gasArray.fncVal;
        }

    }

    return gas;

});

Handlebars.registerHelper("isDataNanoMicro", function (connStatYn) {
    var nanoMicro = "";
    var nanoMicroArray = [];

    if(connStatYn === "N"){
        nanoMicro = "-";
    }else {
        App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i) {
            if (a.fncCd === "D250") {
                nanoMicroArray = a;
            }
        });

        if (nanoMicroArray.length == 0) {
            nanoMicro = "-";
        } else if (nanoMicroArray.length != 0) {
            if (nanoMicroArray.fncVal === "" || nanoMicroArray.fncVal == null) {
                nanoMicro = "-";
            } else {
                nanoMicro = nanoMicroArray.fncVal;
            }

        }
    }

    return nanoMicro;

});

Handlebars.registerHelper("isDataNano", function (connStatYn) {
    var nano = "";
    var nanoArray = [];

    if(connStatYn === "N"){
        nano = "-";
    }else {
        App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i) {
            if (a.fncCd === "D249") {
                nanoArray = a;
            }

        });

        if (nanoArray.length == 0) {
            nano = "-";
        } else if (nanoArray.length != 0) {
            if (nanoArray.fncVal === "" || nanoArray.fncVal == null) {
                nano = "-";
            } else {
                nano = nanoArray.fncVal;
            }

        }
    }
    return nano;
});

Handlebars.registerHelper("isDataMicro", function (connStatYn) {
    var micro = "";
    var microArray = [];

    if(connStatYn === "N"){
        micro = "-";
    }else {
        App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].openDeviceList.forEach(function (a, i) {
            if (a.fncCd === "D102") {
                microArray = a;
            }
        });

        if (microArray.length == 0) {
            micro = "-";
        } else if (microArray.length != 0) {
            if (microArray.fncVal === "" || microArray.fncVal == null) {
                micro = "-";
            } else {
                micro = microArray.fncVal;
            }
        }
    }
    return micro;
});


Handlebars.registerHelper("averageCheck", function (averagePoint) {
    var average;

    if(averagePoint === " " || averagePoint == null ){
        average = "- ";

    }else{
        average = averagePoint;
    }

    return average;
});

Handlebars.registerHelper("averageGradeCheck", function (averageGrade) {

    var averageStatus;
    var dvcCd = App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].dvcCd;

    if(dvcCd === "DVC0000185"){
        averageStatus = "good";

    }else if(dvcCd === "DVC0000204" || dvcCd === "DVC0001350"){

        averageStatus = "default";
    }
    return averageStatus;

});



Handlebars.registerHelper("dvcNmCheck", function (dvcKindCd) {
    var dvcNm;

    if(dvcKindCd === undefined || dvcKindCd == null){
        dvcNm = " ";

    }else if (dvcKindCd === "032") {
        dvcNm = "실내센서";
    }else if (dvcKindCd === "012") {
        dvcNm = "공기청정기";
    }

    return dvcNm;
});

Handlebars.registerHelper("dvcIconCheck", function (dvcKindCd) {
    var dvcIcon;

    if(dvcKindCd === undefined || dvcKindCd == null){
        dvcIcon = "sprite_history_error";
    } else if (dvcKindCd === '012') {
        dvcIcon = "sprite_history_air_purify";
    } else if (dvcKindCd === '032') {
        dvcIcon = "sprite_history_air_sensor";
    }

    return dvcIcon;
});


Handlebars.registerHelper("total", function (data) {
    var totalAverage;

    var reqType = $('.tab_dust .focus a').data("reqtype");

    if(reqType === "000"){
        totalAverage= "/100";

    }else if(reqType === "001") {
        totalAverage = "℃";

    }else if(reqType === "002") {
        totalAverage = "%";

    }else if(reqType === "003") {
        totalAverage = "ppm";

    }else if(reqType === "004") {
        totalAverage = "ppb";

    }else if(reqType === "005") {
        totalAverage = "㎍/㎥";

    }

    return totalAverage;
});

/*Handlebars.registerHelper("scoreTitle", function (data) {
    var title;

    var daily = $('._daily').hasClass('focus')

    if(daily === true){
        title= "이 날의 평균";
    }else if(){
        title = "전 날의 평균";
    }
    else {
        title = "주간 평균";
    }

    return title;
});*/

Handlebars.registerHelper("sidoNmChange", function (code) {
    if (code === '세종특별자치시') {
        return '세종' + '<br>' + '특별자치시';
    } else if (code === '제주특별자치도') {
        return '제주' + '<br>' + '특별자치도';
    } else {
        return code;
    }
});

Handlebars.registerHelper("checkSenLocation", function (loc) {
    var location = loc;
    if (
        location === undefined ||
        location === null ||
        location === ''
    ) {
        return new Handlebars.SafeString('<span class="none_place">※학교 주변 관측소 제공 정보</span>');
    } else {
        return new Handlebars.SafeString('<span class="place"><em class="sprite sprite_common sprite_position"></em>' + location + '</span>');
    }
});



