$(document).ready(function() {
    
    var ValidatorBuilder = {
        
        _element: null,
        
        getOptions : function(element){
            _element = element;
            var type = element.data('type');

            if(type === 'digits'){
                return ValidatorBuilder.getDigits();
            }else if(type === 'string-length'){
                return ValidatorBuilder.getStringLength();
            }else if(type === 'greater-than'){
                return ValidatorBuilder.getGreaterThan();
            }else if(type === 'less-than'){
                return ValidatorBuilder.getLessLength();
            }else if(type === 'email'){
                return ValidatorBuilder.getEmail();
            }else if(type === 'between'){
                return ValidatorBuilder.getBetween();
            }else if(type === 'required'){
                return ValidatorBuilder.getRequired();
            }
            
        },
        getDigits: function(){
            return object = {
                type: 'digits'
            };
        },
        getStringLength: function(){
            return object = {
                type: 'string-length',
                options: {
                    min: _element.find('input[name="min"]').val(),
                    max: _element.find('input[name="max"]').val()
                }
            };
        },
        getGreaterThan: function(){
            return object = {
                type: 'greater-than',
                options: {
                    value: _element.find('input[name="value"]').val(),
                }
            };
        },
        getLessThan: function(){
            return object = {
                type: 'less-than',
                options: {
                    value: _element.find('input[name="value"]').val(),
                }
            };
        },
        getEmail: function(){
            return object = {
                type: 'email'
            };
        },
        getBetween: function(){
             return object = {
                type: 'between',
                options: {
                    min: _element.find('input[name="min"]').val(),
                    max: _element.find('input[name="max"]').val()
                }
            };
        },  
        getRequired: function(){
            return object = {
                type: 'required'
            };
        },        
        
    };
    
    
    var RetObject = {
        
        getSelecteElements : function(){
            var elements = new Array();
            var selectedElements =  $('ul[data-target="selected"]').find('li');
      
            $.each(selectedElements, function(index, element){

               var validators = new Array();
               var elementName = $(element).data('element');
               var tableName = $(element).data('form');

               var paramsWrap = $('div[data-form="'+tableName+'"][data-element="'+elementName+'"]');
               $.each(paramsWrap.find('.validator-list').find('li') , function(index, validator){
                   validators.push(ValidatorBuilder.getOptions($(validator)));
               });

               var element = {
                 name: elementName,
                 table: tableName,
                 label: paramsWrap.find('input[data-type="label"]').val(),
                 type: paramsWrap.find('select[data-type="type"]').val(),
                 validators : validators
               };
               elements.push(element);
            });
            
            return elements;
        },
        getTablesDescription: function(){
            var tables = new Array();
            $.each($('.base-class-name'), function(index,element){
                var table = {
                  name: $(element).data('form'),
                  class: $(element).val()
                };
                tables.push(table);
            });
            
            return tables;
      
        },
        getParams: function(){
            return {
                author : $('#author').val(),
                copyright : $('#copyright').val(),
                project : $('#project').val(),
                license : $('#license').val(),
                moduleName : $('#moduleName').val(),
                adapterServiceKey : $('#adapterServiceKey').val(),
                descriptor : $('#descriptor').val()
            };
        }
        
    };
    
    
    $('body').on('click', '.show-fields' , function(e){
        e.preventDefault();
        $('.field-list-wrap').hide();
        $('div[class*=field-list-wrap][data-form="'+$(this).data('form')+'"]').show();
    });
    
    $('body').on('click', '.move-all' , function(e){
        e.preventDefault();
        var lis = $(this).parents('.column').first().find('li');
        var targetUl = $(this).parents('.row').first().find("ul[data-target='"+$(this).data('ul')+"']");
        
        lis.each(function(index, element){
           targetUl.append(element); 
        });
    });
    
    $('body').on('click', '.delete-v' , function(e){
        e.preventDefault();
        $(this).parents('li').remove();
        
    });
    
    $('body').on('click', '.edit' , function(e){
        e.preventDefault();
        
        var formName = $(this).attr('data-form');
        var elementName = $(this).attr('data-element');
        
        var elementWrap = $('div[data-form="'+formName+'"][data-element="'+elementName+'"]');
        
        $('.element-wrap').hide();
        $('.element-wrap').removeClass('active');
        
        if(elementWrap.length > 0){
            elementWrap.show();
        }else{
            alert('wrong');
        }
        elementWrap.addClass('active');
    });
    
    
    $('.add-validator').on('click', function(e){
       var selectedValidator = $(this).siblings('.validators').val();
       var li = $('.template-v').find("li[data-type='"+selectedValidator+"']").clone();
       var elementWrap = $('div[class="element-wrap active"]');
       
       if(elementWrap.length === 0){
           alert("Please select form element");
           return;
       }
       elementWrap.find($('.validator-list')).append(li);
    });
    
    
    
    $('.build-validators').on('click' , function(e){
      
      ret = {
          params: RetObject.getParams(),
          tables: RetObject.getTablesDescription(),
          elements: RetObject.getSelecteElements()
      };
      
      var json = JSON.stringify(ret);
      console.log(json);
        
    });
    
    
    
});