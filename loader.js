// loader.js - GroupSession稟議管理ツール読み込み用
(function() {
    'use strict';
    
    // 既存のツールがある場合は表示
    if (document.getElementById('ringi-manager-overlay')) {
        document.getElementById('ringi-manager-overlay').style.display = 'block';
        return;
    }
    
    function findValidParent() {
        var candidates = [
            document.body,
            document.documentElement,
            document.getElementsByTagName('body')[0],
            document.getElementsByTagName('html')[0]
        ];
        
        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] && typeof candidates[i].appendChild === 'function') {
                return candidates[i];
            }
        }
        return null;
    }
    
    function createTool() {
        var parent = findValidParent();
        if (!parent) {
            alert('DOM要素の取得に失敗しました。ページを再読み込みしてから再試行してください。');
            return;
        }
        
        var overlay = document.createElement('div');
        overlay.id = 'ringi-manager-overlay';
        overlay.setAttribute('style', 
            'position:fixed!important;' +
            'top:0!important;' +
            'left:0!important;' +
            'width:100%!important;' +
            'height:100%!important;' +
            'background-color:rgba(0,0,0,0.8)!important;' +
            'z-index:2147483647!important;' +
            'display:flex!important;' +
            'justify-content:center!important;' +
            'align-items:center!important;' +
            'font-family:Arial,sans-serif!important;'
        );
        
        var container = document.createElement('div');
        container.setAttribute('style',
            'width:90%!important;' +
            'max-width:1200px!important;' +
            'height:80%!important;' +
            'background-color:white!important;' +
            'border-radius:15px!important;' +
            'box-shadow:0 10px 30px rgba(0,0,0,0.5)!important;' +
            'display:flex!important;' +
            'flex-direction:column!important;' +
            'overflow:hidden!important;'
        );
        
        var header = document.createElement('div');
        header.setAttribute('style',
            'background-color:#3498db!important;' +
            'color:white!important;' +
            'padding:15px 20px!important;' +
            'display:flex!important;' +
            'justify-content:space-between!important;' +
            'align-items:center!important;'
        );
        
        var title = document.createElement('span');
        title.textContent = '📋 稟議管理ツール';
        title.setAttribute('style', 'font-size:18px!important;font-weight:bold!important;');
        
        var closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.setAttribute('style',
            'background:rgba(255,255,255,0.2)!important;' +
            'border:none!important;' +
            'color:white!important;' +
            'width:30px!important;' +
            'height:30px!important;' +
            'border-radius:15px!important;' +
            'cursor:pointer!important;' +
            'font-size:20px!important;'
        );
        
        closeBtn.onclick = function() {
            try {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            } catch(e) {
                overlay.remove();
            }
        };
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        var iframe = document.createElement('iframe');
        iframe.src = 'https://groupsession-ringi-plugin.vercel.app';
        iframe.setAttribute('style',
            'width:100%!important;' +
            'height:100%!important;' +
            'border:none!important;' +
            'flex:1!important;'
        );
        
        container.appendChild(header);
        container.appendChild(iframe);
        overlay.appendChild(container);
        
        overlay.onclick = function(e) {
            if (e.target === overlay) {
                try {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                } catch(e) {
                    overlay.remove();
                }
            }
        };
        
        try {
            parent.appendChild(overlay);
        } catch(e) {
            try {
                parent.insertBefore(overlay, parent.firstChild);
            } catch(e2) {
                alert('ツールの表示に失敗しました: ' + e2.message);
            }
        }
        
        console.log('📋 稟議管理ツール: 起動完了');
    }
    
    setTimeout(createTool, 100);
    
})();