let Project = require('/home/alaakurdi/Desktop/Miniproj/models/projects');
var user = require('/home/alaakurdi/Desktop/Miniproj/routes');
let projectController = {

    getAllProjects:function(req, res){

        Project.find(function(err, projects){

            if(err)
                res.send(err.message);
            else
                res.render('project', {projects});
        })
    },

    createProject:function(req, res){
        let project = new Project(req.body);

        project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{

                console.log(project);
                res.redirect('/project');
            }
        })
    }
}



module.exports = projectController;
