var loading_state = function (data){
    function get_data(){
        // var key_str = '[{0},{1}]'.replace(/{(\d+)}/gm,function(match,name){ 
        //     return arguments[~~name];
        // });
        var key_str = '['+arguments[0]+','+arguments[1]+']';
        return data[key_str];
    }
    var require_num = [];
    var remain_num = [];
    for(var time_index = 0; time_index < 24; ++time_index){
        require_num.push(get_data(time_index,0));
        remain_num.push(-get_data(time_index,1));
    }
    return {
        require: require_num,
        remain: remain_num
    };
};

var direction = function(data){
    var rst = [], one_hour_rst = [];
    function get_data(time,direction){
        var key_str = '['+time+','+direction+']';
        var hsj = data[key_str] ? data[key_str] : 0;
        return data[key_str]? data[key_str] : 0;
    }

    for(var time_index = 0; time_index < 24; ++time_index){
        one_hour_rst = [];
        for(var speed_index = 2; speed_index < 360; speed_index +=2){
            one_hour_rst.push({
                value: get_data(time_index,speed_index),
                name: speed_index + '度'
            });
        }
        rst.push({
            name: time_index + 'H',
            type: 'pie',
            radius:[20,100],
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            center:['50%','50%'],
            roseType: 'area',
            data: (function(data){return data;})(one_hour_rst)
        });
    }
    return rst;
};

var location = function(data){
    var rst = [];
    for(var key in data){
        if(data.hasOwnProperty(key)){
            rst.push({
                coords: data[key]
            }); 
        }
    }
    return rst;
};

module.exports = {
    direction: direction,
    loading_state: loading_state,
    location: location
};