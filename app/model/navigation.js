'use strict';
/**
 * [exports description]
 * @param  {[type]} begin       [description]
 * @param  {[type]} end         [description]
 * @param  {[type]} data        [description]
 * @param  {[type]} geoCoordMap [description]
 * @return {[type]}             [description]
 */
module.exports = function (begin,end,geoCoordMap) {
    var res = [];
    var fromCoord = geoCoordMap[begin];
    var toCoord = geoCoordMap[end];
    if(fromCoord && toCoord){
        res.push({
            fromName: begin,
            toName: end,
            coords: [fromCoord,toCoord]
        });
    }
    return res;
};