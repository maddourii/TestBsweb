var Employee = require('../models/employee');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    Employee.find({}).exec(function(err, employees){
        if(err) res.json({error: err});
		    else res.json(employees);
    });
});


router.get('/:id',function(req,res){
	Employee.findById(req.params.id).exec(function(err, employee){
		if(err) res.json({error: err});
		else res.json(employee);
    });
});


router.post('/',function(req, res){
    var a = new Employee(req.body);
    a.save(function(err){
        if(err) res.json({error: err});
        else res.json({message: 'employee added!'});
    });
});



router.put('/:id',function(req,res){
	var data = req.body;
  delete data._id;
    Employee.findByIdAndUpdate(req.params.id, data, {new: true}, function(err){
        if(err) res.json({error: err});
        else res.json({message: 'employee updated!'});
    });
});


router.delete('/:id',function(req,res){
	Employee.findByIdAndRemove(req.params.id, function(err){
        if(err) res.json({error: err});
        else res.json({message: 'employee deleted!'});
    });
});


module.exports = router;
