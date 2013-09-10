#xin-data

##Memory Adapter
###Basic usage
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
(In Documentation Progress)
