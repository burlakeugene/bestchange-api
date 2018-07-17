var items = [
    {
      toggle: 'div.all',
      targets: '.smartphone,.tablet,.notebook',
      type: 'remove',
      class: 'visible'
    },{
      toggle: 'div.notebook',
      targets: '.notebook',
      type: 'toggle',
      class: 'visible'
    },{
      toggle: 'div.tablet',
      targets: '.tablet',
      type: 'toggle',
      class: 'visible'
    },{
      toggle: 'div.smartphone',
      targets: '.smartphone',
      type: 'toggle',
      class: 'visible'
    }
  ];
  
  function itemEvents(item, callback){
    var domsItem = item['toggle'] ? document.querySelectorAll(item['toggle']) : false,
        domTargets = item['targets'] ? document.querySelectorAll(item['targets']) : false,
        type = item['type'] ? item['type'] : false,
        className = item['class'] ? item['class'] : '';
    if(domsItem && domTargets && type){
      domsItem.forEach(function(domItem){
        itemClick(domItem, () => {
          domTargets.forEach(function(targetItem){
            targetItem.classList[type](className);
          });
        })
      });
    }
  }
  
  function itemClick(item, callback){
     item.addEventListener('click', function(e){
       e.preventDefault();
       callback && callback();
     })
  }
  
  items.forEach(function(item){
    itemEvents(item);
  });