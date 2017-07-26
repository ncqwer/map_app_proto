var parse_data = require('./parse_data.js');
var $ = require('jquery');
var test_data = require('../data/loading_state.json');
var echarts = require('echarts');
var direction_data = require('../data/direction.json');



var data = parse_data.loading_state(test_data.taxi_id);

var chart1 = echarts.init(document.getElementById('map-wrap'));
chart1.setOption({
    legend: {
        data:['需求','空缺']
    },
    xAxis:{
        type:'category',
        data:['12a', '1a', '2a', '3a', '4a', '5a', '6a','7a', '8a', '9a','10a','11a','12p', '1p', '2p', '3p', '4p', '5p','6p', '7p', '8p', '9p', '10p', '11p'],
        // splitArea:{show:true}
    },
    yAxis:{
        type:'value'
    },
    series: [
        {
            name: '需求',
            type: 'bar',
            stack: 'one',
            data: data.require
        },
        {
            name: '空缺',
            type: 'bar',
            stack: 'one',
            data: data.remain
        },
    ]
});

var chart2 = echarts.init(document.getElementById('path-info'));

var hsj = parse_data.direction(direction_data.taxi_id);
var legend = [];
for(var direction_index = 2; direction_index < 360; direction_index += 2){
    legend.push(direction_index + '度');
}
chart2.setOption({
    legend:{
        selectedMode: 'single',
        data:['0H','1H','2H','3H','4H','5H','6H','7H','8H','9H','10H','11H','12H','13H','14H','15H','16H','17H','18H','19H','20H','21H','22H','23H']
        // data:legend       
    },
    series:hsj
});

var location_chart = echarts.init(document.getElementById('location_chart'));
$.get('../data/武汉市.json',function(wuhan){
    echarts.registerMap('wuhan',wuhan);
    location_chart.setOption({
        geo:{
            map: 'wuhan'
        },
    });    
});

location_chart.showLoading();

$.get('../data/taxi_location.json',function(location_data){
    location_chart.hideLoading();
    location_chart.setOption({
        geo:{
            map: 'wuhan',
            roam: true
        },
        series:{
            type: 'lines',
            polyline: true,
            coordinateSystem: 'geo',
            large: true,
            data: parse_data.location(location_data)
        }
    });
});
