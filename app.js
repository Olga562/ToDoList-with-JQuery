$(document).ready(function() {
    $("#panel").hide();

    $("#flip").click(function () {
    $("#panel").slideToggle("slow");
});

    const listInput = $("#myInput");
    const listAlert = $("#Alert");
    const listUl = $("#list-items");
    const completedCounter = $("#completed-counter");
    const uncompletedCounter = $("#uncompleted-counter");


    readListItems();
    updateCounters();

    $(".addBtn").click(function(){
        addItem();
    });

    //Adding item to the list
    function addItem(){
        const inputValue = listInput.val().trim();
        //Checking input
        if(inputValue=="" || inputValue.length < 2){
            listAlert.text("Invalid item input!");
            listInput.addClass("error");  // Add 'error' class
            return;
        }

        listAlert.text("");//Remove error message
        listInput.removeClass("error");//Remove "error" class

        const listItem = createNewItem(inputValue);//Creating new item and adding it to the list
        listUl.append(listItem);
        listInput.val("");//Clear input field

        saveListItem(); 
        updateCounters();
        
    }

    //Creating new item and delete button
    function createNewItem(inputValue){
        const listItem = $("<li>");
        const label = $("<label>").text(inputValue);
        const deleteBtn = $("<button>").html("&times;");

        
        listItem.append(label).append(deleteBtn);
    
        deleteBtn.on("click", function(e){
            e.stopPropagation();
            listItem.remove();
            saveListItem();//Saving list and updating counter
            updateCounters();
        });

        listItem.on("click", function () {
            $(this).toggleClass("checked");
            saveListItem();
            updateCounters();
            });

        return listItem

    }


    //Bringing from Local Storage
    function readListItems(){
        let savedItems = localStorage.getItem("listed-items");
        savedItems = JSON.parse(savedItems);
        if(!savedItems) return;
        
        savedItems.forEach((item) => {
            const listItem = createNewItem(item.text);//creating list
            if (item.checked) {
                listItem.addClass("checked");
            }
            listUl.append(listItem);
        });
    }

    //Saving to Local Storage
    function saveListItem(){
        const list = [];
        $("#list-items li").each(function(){
            const text = $(this).find("label").text();
            const isChecked = $(this).hasClass("checked");
            list.push($(this).text());
        });
        localStorage.setItem("listed-items", JSON.stringify(list))

    }


    //Updating the list
    function updateCounters() {
        const completed = $("#list-items li.checked").length;
        const uncompleted = $("#list-items li").not(".checked").length;
    
        completedCounter.text(completed);
        uncompletedCounter.text(uncompleted);
    }
   
  });  
