// Assuming inputs are strings - returning one address string
var computeMid = function(loc1, loc2){
  var add1 = loc1.split(" ,");
  var add2 = loc2.split(" ,");
  var latMid = (add1[0] + add2[0])/2;
  var longMid = (add1[1] + add2[1])/2;
  var midPt = latMid + ", " + longMid;
  return midPt;
}
