var util = require('./util');
var ghClipping = require('./greiner-hormann');

module.exports = function(subject, clip) {
  intersect = util.clone(subject);
  holes = util.clone(clip);

    // Next we'll subtract each hole from each intersection polygon.
  for (var i = 0; i < clip.length; i++) {
    var ilen = intersect.length;
    for (var j = 0; j < intersect.length; j++) {
      var test = ghClipping(intersect[j][0], holes[i], false, true);

      // Copy the primary hull of the intersect record that
      // we just clipped against the hull
      intersect[j][0] = test[0][0];

      // Copy in each hole (if there were any) for the primary hull
      for (var k = 1; k < test[0].length; k++) {
        intersect[j].push(test[0][k]);
      }

      // If there are any additional polygons in the result,
      // they were newly created by intersecting this hole.
      // Push the new polygon (hull and any holes) straight
      // into the intersect list
      for (var k = 1; k < test.length; k++) {
        intersect.push(test[k]);
      }
    }

    // If the length has changed, this hole created
    // new intersection polygons, which means it's not a hole
    // anymore (it crossed the polys, now it's boundary is
    // part of the new intersection hulls). Therefore, we
    // remove this hole from the list so it won't be returned.
    if (ilen != intersect.length) {
      holes.splice(i)
      i--;
    }
  }

    // if (holes.length > 0) {
    //   intersect = intersect.concat(holes);
    // }

  return intersect;
}