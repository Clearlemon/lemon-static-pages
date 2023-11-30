document.addEventListener('DOMContentLoaded', function () {
    // 获取<a>标签
    var diaryLink = document.querySelector('.len-nav-link-block[href="Page/diary.html"]');

    // 获取要展示内容的容器
    var showcaseMain = document.querySelector('.len-showcase-main');

    // 获取加载动画的容器
    var loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';

    // 给<a>标签添加点击事件
    diaryLink.addEventListener('click', function (event) {
        // 阻止默认的跳转行为
        event.preventDefault();

        // 显示加载动画
        showcaseMain.innerHTML = '';
        showcaseMain.appendChild(loadingSpinner);

        // 获取目标链接
        var targetUrl = diaryLink.getAttribute('href');

        // 使用Fetch API加载目标链接的内容
        fetch(targetUrl)
            .then(response => response.text())
            .then(data => {
                // 隐藏加载动画，将内容插入到展示容器中
                showcaseMain.removeChild(loadingSpinner);
                showcaseMain.innerHTML = data;

                // 保存加载的内容到本地存储
                localStorage.setItem('loadedContent', data);
            })
            .catch(error => {
                console.error('Error fetching content:', error);
                // 如果加载出错，恢复本地存储中的内容
                var storedContent = localStorage.getItem('loadedContent');
                if (storedContent) {
                    showcaseMain.innerHTML = storedContent;
                } else {
                    showcaseMain.innerHTML = '<p>Failed to load content.</p>';
                }
            });
    });

    // 页面加载时，尝试从本地存储中恢复内容
    var storedContent = localStorage.getItem('loadedContent');
    if (storedContent) {
        showcaseMain.innerHTML = storedContent;
    }
});