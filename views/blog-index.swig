  {% for article in articles %}
    <article class="post" url-data="{{ article.url }}">
      <header class="post-header">
        <h2 class="blog-single-post-title"><a href="#{{ article.url }}">{{ article.name }}</a></h2>
          </header>
            <div class="post-content">
              <p class="post-excerpt">
              {{ article.description }}
              <a href="#{{ article.url }}" class = "articleLink">阅读全文</a>
              </p>
              <div class="row">                                         <div class="col-sm-12">
                  <div class="post-meta">                                   <div class="row">                                        <div class="col-sm-6">
                        <span class="post-date"><b>发布于: </b>{{ article.createTime }}</span>                                      </div>                                                  <div class="col-sm-6 comment-count">
                    <a href="#">0  comments</a>
                     </div>
                 </div>
                 </div>
             </div>
             </div>
          </div>
       </article>
      {% endfor %}
