$(document).ready(function(){
	$("#submit").click(function(e){
	e.preventDefault();
	var user= $("#username").val();
	if(user=="")
		document.getElementById('generate').innerHTML=`<div class="alert alert-danger" role="alert">
																Username field cannot be empty.
																</div>`;
																
	else{
		document.getElementById('generate').innerHTML=`<div class="alert alert-primary" role="alert">
																Loading....
																</div>`;
		$("#profile").load("https://api.github.com/users/"+user,function(responseTxt, statusTxt, xhr){
			if(statusTxt=="error")
			{
				document.getElementById('profile').innerHTML=`<div class="alert alert-danger" role="alert">
																Error in loading content.Username may be invalid.
																</div>`
			}
			if(statusTxt=="success")
			{
			var content=JSON.parse(responseTxt);
			document.getElementById('profile').innerHTML = `<div class="card">
  								<div class="card-header">
    							<h3 class="card-title">${content.name}</h3>
  								</div>
  								<div class="card-body">
    								<div class="row">
    								<div class="col-md-3">
    								<img src="${content.avatar_url}" class="img-fluid">
    								</div>
    								<div class="col-md-9">
    									<span class="badge badge-primary">Public Repos: ${content.public_repos}</span><br>
    									<span class="badge badge-danger">Public Gists: ${content.public_gists}</span>
    									<br><br>
    									<ul class="list-group">
    										<li class="list-group-item">Bio: ${content.bio}</li>
    										<li class="list-group-item">Email: ${content.email}</li>
    									</ul><br>
    									<a class="btn btn-secondary" target="_blank" href="${content.html_url}">Visit Github</a>
    								</div>
    								</div>
  								</div>
				</div>`;
			}
			
		});
	}});
});