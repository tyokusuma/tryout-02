# tryout-02

# Contributor
* Tyoaris21@gmail.com
* tyokusuma

# Lisensi
* tyokusuma@2017


# How to run

## Client

* directory using cd tryout/todolistreact
* Build react js with npm start
* this is front end to catch data of server or to do list from its array

```
  render() {
    return (
      <div className="BackCenter">
        <h3>TODO LIST</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{'Add TODO ' + (this.state.items.length + 1)}</button>

        </form>
      </div>
    );
  }

  componentDidMount() {
    axios.get('http://localhost:3001/').then(res => {
      console.log('================================', res);
      this.setState({
        items: res.data,
      });
    });
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.state.text,
      id: Date.now(),
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: '',
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    );
  }
}
```

## Server

* directory using cd tryout-02/server
* If you just clone this repository, you must install all dependencies using yarn install or npm install
* Run the server by executing node index.js

## Data server


```
var express = require('express');
var app = express();
var cors = require('cors');

var data = [
  {id: '1', text: 'To Do list from server 1'},
  {id: '2', text: 'TodoList from server 2'},
];

app.use(cors());

app.get('/', function(req, res) {
  res.send(data);
});

app.listen(3001, function() {
  console.log('example app port 3001!');
});
```


# NATIVE MODULE

![](https://github.com/tyokusuma/tryout-02/blob/master/nativemodulespeach/Screenshot_1492012573.png)
![](https://github.com/tyokusuma/tryout-02/blob/master/nativemodulespeach/Screenshot_1492012605.png)


## how to create native module

### create module Speech To Text

```
package com.nativemodulespeach;

import android.app.Activity;
import android.content.Intent;
import android.speech.RecognizerIntent;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.ArrayList;

public class speachmodule extends ReactContextBaseJavaModule implements ActivityEventListener {


    private final int REQ_CODE_SPEECH_INPUT = 100;
    private ReactApplicationContext mReactContext;
    private Promise mPromise;

    public speachmodule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        mReactContext = reactContext;
    }


    @Override
    public String getName() {
        return "nativemodulespeach";
    }

    @ReactMethod
    public void start(Promise promise){
        openspeechtoText();
        mPromise = promise;
    }

    private void openspeechtoText(){
        Activity mCurrentActivity = getCurrentActivity();

        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Say Something");

         mCurrentActivity.startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);
         {
             Toast.makeText(mReactContext, "FAILED TO SPEECH",
                     Toast.LENGTH_SHORT).show();
         }
    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (null != data) {

                    ArrayList<String> result = data
                            .getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    mPromise.resolve(result.get(0));
                }
                break;
            }
        }
    }



    @Override
    public void onNewIntent(Intent intent) {

    }
}
```

### PACKAGE NATIVE MODULE SPEECH TO TEXT

```
package com.nativemodulespeach;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SpechPackage implements ReactPackage{
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(new speachmodule(reactContext));
        return nativeModules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
```
### AND THEN REGISTER YOUR PACKAGE TO MAIN APPLICATION

```
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new SpechPackage()
      );
    }
  };
```

### iMPLEMENTATION YOUR NATIVE MODULE TO REACT NATIVE

```
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
const Module = NativeModules.nativemodulespeach;

export default class nativemodulespeach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'helo',
    };
  }
  functionspeach() {
    Module.start()
      .then(resp => {
        this.setState({text: resp});
      })
      .catch(err => console.log('err', err));
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.functionspeach()}>
          <Text> PRESS IF U WANNA SPEECH </Text>
        </TouchableOpacity>
        <Text style={styles.welcome} />
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nativemodulespeach', () => nativemodulespeach);
```



