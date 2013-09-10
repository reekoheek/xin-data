#xin-data

##Local Storage Adapter
###Basic usage
Include this script tag on your html file
```html
<script type="text/javascript" src="../src/adapters/local-storage.js"></script>
```
```javascript
var repo = window.repo = new xin.data.Repository({}, function(err) {
        if (err) throw new Error(err.message);

        // Saving record
        repo.save({'name': 'ani', 'age': 16}, function() {
            console.log("Saving ani");
        });

        // Updating record
        repo.save({"name": "ani": "age": "22"}, function() {
            console.log("Updating ani");
        });

        // Getting record
        repo.get([id]], function(record) {
            console.log(record);
        });

        // Getting all records
        repo.all(function(records) {
            console.log(records);
        });

        // Removing records
        repo.remove([id], function() {
            console.log('Record has been removed');
        });

        // Drop all records
        repo.nuke(function() {
            console.log("Nuked");
        });
    });
```
###API
(In Documentation Progress)

##Memory Adapter
The goal of this adapter is to maintain your data just like MongoDB query.
###Basic usage
Include this script tag on your html file
```html
<script type="text/javascript" src="../src/adapters/memory.js"></script>
```
```javascript
var repo = window.repo = new xin.data.Repository({}, function(err) {
        if (err) throw new Error(err.message);

        // Saving record
        repo.save({'name': 'ani', 'age': 16}, function() {
            console.log("Saving ani");
        });

        // Updating record
        repo.update({"name": "ani"}, {"name": "banu"}, function() {
            console.log("Updating ani");
        });

        // Getting record
        repo.get({'name': 'banu'}, function(record) {
            console.log(record);
        });

        // Getting all records
        repo.all(function(records) {
            console.log(records);
        });

        // Removing records
        repo.remove({'name': 'ani'}, function(criteria) {
            console.log(criteria.name + ' has been removed');
        });

        // Drop all records
        repo.nuke(function() {
            console.log(repo.all()); // Should be -> {}
        });
    });
```
###API
####Instantiating
When you instatiating this adapter, some procedure can be called by it's callback argument via constructor.
```javascript
var repo = window.repo = new xin.data.Repository({name: 'record'}, function(err) {
    if(err) { throw new Error(err); } // error handling
    // put your own constructor here
});
```
####.save(record, callback)
When you call this function, the callback function will be fired with 'record' as it's argument. There's no return value if you're not give a callback to this function. You should give some record to it's agruments, or this function will fail to execute.
```javascript
repo.save({'index': 'record'}, function(record) {
    console.log(record); // it should be -> {'index': 'record'}
});
```
####.update(criteria, record, callback)
- criteria
    Type must object, or it will fail. It contains the criteria of record you want to update. It should single criteria, or the second criteria will be applied.
- record
    Type must object, or it will fail.
- callback
    It's not neccesary, but if it's provided, callback will be fired with updated record as it's agrument
This function will update the first-match record on your repo. Need some improvement.
```javascript
// I wanna change the record which has 'banu' as name values with 'budi'
repo.update({'name': 'banu'}, {'name': 'budi'}, function(record) {
    console.log(record); // it should be -> {'name': 'budi', 'id': [the uuid]}
});
```

####.get(criteria, callback)
- criteria
    Type must object, or it will fail. It contains the criteria of record you want to get. It should single criteria, or the second criteria will be applied.
- callback
    It's not neccesary, but if it's provided, callback will be fired with first-gotten record as it's agrument. If not, it will return the first-gotten record.
This function will fetch the first-match record on your repo. Need some improvement.
```javascript
// I wanna get a record which has 'ani' as name value
repo.get({'name': 'ani'}, function(record) {
    console.log(record); // it should be -> {'name': 'ani', id: [the uuid]}
});
```

####.all(callback)
When you call this function, the callback function will be fired with 'record' as it's argument. If there's no callback, this function will return all of data object.
```javascript
repo.all(function(records) {
    console.log(records); // it should be all of your data in your repository
});
```

####.remove(criteria, callback)
Same with update. But it will remove first-match record on your repository. Need some improvement.
```javascript
// I wanna remove a record which has 'tuti' as name value
repo.remove({'name': 'tuti'}, function() {
    // The callback doesn't provide any arguments, since the data is removed on your repository
});
```
####.nuke(callback)
Same with .all(). But it will remove all of your repository contents.
```javascript
repo.nuke(function(records) {
    // The callback doesn't provide any arguments, since the data is removed on your repository
});
```
