
## Support vector machine in Python using libsvm example of features
Stackoverflow questions by Usi Usi: http://stackoverflow.com/questions/30991592
/support-vector-machine-in-python-using-libsvm-example-of-features
### Step 0: Install dependencies
You need to install the following libraries:
* pandas
* scikit-learn

From command line:

```
pip install pandas
pip install scikit-learn
```

### Step 1: Load the data
We will use pandas to load our data.
pandas is a library for easily loading data. For illustration, we first save
sample data to a csv and then load it.

We will train the SVM with `train.csv` and get test labels with `test.csv`


    import pandas as pd
    
    train_data_contents = """
    class_label,distance_from_beginning,distance_from_end,contains_digit,capitalized
    B,1,10,1,0
    M,10,1,0,1
    C,2,3,0,1
    S,23,2,0,0
    N,12,0,0,1"""
    
    
    with open('train.csv', 'w') as output:
        output.write(train_data_contents)
        
    train_dataframe = pd.read_csv('train.csv')


### Step 2: Process the data
We will convert our dataframe into numpy arrays which is a format that scikit-
learn understands.

We need to convert the labels "B", "M", "C",... to numbers also because svm does
not understand strings.

Then we will train a linear svm with the data


    import numpy as np
    
    train_labels = train_dataframe.class_label
    labels = list(set(train_labels))
    train_labels = np.array([labels.index(x) for x in train_labels])
    train_features = train_dataframe.iloc[:,1:]
    train_features = np.array(train_features)
    
    print "train labels: "
    print train_labels
    print 
    print "train features:"
    print train_features


    train labels: 
    [1 2 0 3 4]
    
    train features:
    [[ 1 10  1  0]
     [10  1  0  1]
     [ 2  3  0  1]
     [23  2  0  0]
     [12  0  0  1]]


We see here that the length of `train_labels` (5) exactly matches how many rows
we have in `trainfeatures`. Each item in `train_labels` corresponds to a row.

### Step 3: Train the SVM


    from sklearn import svm
    classifier = svm.SVC()
    classifier.fit(train_features, train_labels)




    SVC(C=1.0, cache_size=200, class_weight=None, coef0=0.0, degree=3, gamma=0.0,
      kernel='rbf', max_iter=-1, probability=False, random_state=None,
      shrinking=True, tol=0.001, verbose=False)



### Step 4: Evaluate the SVM on some testing data


    test_data_contents = """
    class_label,distance_from_beginning,distance_from_end,contains_digit,capitalized
    B,1,10,1,0
    M,10,1,0,1
    C,2,3,0,1
    S,23,2,0,0
    N,12,0,0,1
    """
    
    with open('test.csv', 'w') as output:
        output.write(test_data_contents)
    
    test_dataframe = pd.read_csv('test.csv')
    
    train_labels = test_dataframe.class_label
    labels = list(set(train_labels))
    test_labels = np.array([labels.index(x) for x in train_labels])
    
    test_features = test_dataframe.iloc[:,1:]
    test_features = np.array(test_features)
    
    results = classifier.predict(test_features)
    num_correct = (results == test_labels).sum()
    recall = num_correct / len(test_labels)
    print "model accuracy (%): ", recall * 100, "%"

    model accuracy (%):  100 %


### Links & Tips
* [Example code for how to load LinearSVC](http://scikit-
learn.org/stable/modules/svm.html#svm)
* [Long list of scikit-learn examples](http://scikit-
learn.org/stable/auto_examples/index.html). I've found these mildly helpful but
often confusing myself.
* If you find that the SVM is taking a long time to train, try [LinearSVC
instead](http://scikit-
learn.org/stable/modules/generated/sklearn.svm.LinearSVC.html)

