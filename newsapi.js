

$(document).ready(function(){
    $("#searchbtn").on("click",function(e){
        e.preventDefault();

        let query = $("#searchquery").val();
        let url = "https://newsapi.org/v2/top-headlines?q="+query+"&country=us&category=business&apiKey=246c177db51a42838f6c2e8f1fa85971";

        if(query !==""){

            $.ajax({
                url: url,
                method: "GET",
                dataType: "json",

                beforeSend: function(){
                    $("#loader").show();
                },

                complete: function(){
                    $("#loader").hide();
                },

                success: function(news){
                    let output = "";
                    let latestNews = news.articles;

                    for(var i in latestNews){
                        output +=`
                            <div class="col-12 col-md-4">
                            <div class="card">
                            <h4>${latestNews[i].title}</h4>
                            <img src="${latestNews[i].urlToImage}" class="img-responsive card-img-top">
                            <div class="information">
                            <p><strong>${latestNews[i].author}</strong></p>
                            <p>${latestNews[i].description}</p>
                            <a href="${latestNews[i].url}" class="btn bg-primary">Leer</a>
                            </div>
                            </div>
                            </div>
                        `;
                    }

                    if(output !==""){
                        $("#newsResults").html(output);
                        M.toast({
                            html:"Buenas noticias",
                            classes: 'green'
                        });
                    }else{
                        let noNews = `<div style='text-align:center; font-size:36px;margin-top:40px;'>Esta noticia no est&aacute; disponible. Lo siento.</div>`;
                        $("#newsResults").html(noNews);
                        M.toast({
                            html: "Esta noticia no est&aacute; disponible",
                            classes: 'bg-red'
                        });
                    }
                    
                },

                error: function(){
                    let internetFailure = `
                    <div style="font-size:34px; text-align:center; margin-top:40px;">Comprueba tu conexi&oacute;n</div>`;

                    $("#newsResults").html(internetFailure);
                    M.toast({
                        html: "Encontramos un error intente nuevamente",
                        classes: 'bg-red'
                    });
                }
            });

        }else{
            let missingVal = `<div style="font-size: 34px; text-align:Center;margin-top:40px;">ingrese cualquier término de b&uacute;squeda</div>`;
            $("#newsResults").html(missingVal);
            M.toast({
                html: "Por favor ingresa un t&eacute;rmino",
                classes: 'bg-red'
            });
        }
        console.log()
    });
});

