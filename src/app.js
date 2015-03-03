/** @jsx React.DOM */
var EsStatus = React.createClass({

    getEsStatus: function () {
        var elasticsearchBaseUrl = "http://localhost:9200";
        console.log("getEsStatus");
        var esStatus = this;
        $.get( elasticsearchBaseUrl)
            .done(function( data ) {
                console.log("done");
                console.log(data);
                var newState = esStatus.mapToState(data);
                esStatus.setState(newState);
            }).fail(function() {
                console.log("fail");
            });
    },
    mapToState: function (esStatus) {
        return( {
            "status" : esStatus.status,
            "name" : esStatus.name,
            "cluster_name" : esStatus.cluster_name,
            "version" : {
                "number" : esStatus.version.number,
                "build_hash" : esStatus.version.build_hash,
                "build_timestamp" : esStatus.version.build_timestamp,
                "build_snapshot" : esStatus.version.build_snapshot,
                "lucene_version" : esStatus.version.lucene_version
            },
            "tagline" : esStatus.tagline
        });
    },
    refresh: function(){

        this.getEsStatus();

    },
    getInitialState: function(){
        return {
            "status" : 0,
            "name" : "unknown",
            "cluster_name" : "unknown",
            "version" : {
                "number" : "unknown",
                "build_hash" : "unknown",
                "build_timestamp" : "unknown",
                "build_snapshot" : false,
                "lucene_version" : "unknown"
            },
            "tagline" : "unknown"
        }
    },
    render : function(){

        var divStyle = {};
        if(this.state.status===200){
            divStyle.backgroundColor = "lightgreen";
        }

        return (
            <div className="nodeStatus" style={divStyle}>
                <h1>Status: {this.state.status}</h1>
                <h1>Name: {this.state.name}</h1>
                <h4>Cluster_name: {this.state.cluster_name}</h4>
                <h4>Number: {this.state.version.number}</h4>
                <h4>Build_hash: {this.state.version.build_hash}</h4>
                <h4>Build_timestamp: {this.state.version.build_timestamp}</h4>
                <h4>Build_snapshot: {this.state.version.build_snapshot}</h4>
                <h4>Lucene_version: {this.state.version.lucene_version}</h4>
                <h4>Tagline: {this.state.tagline}</h4>
                <button type="button" onClick={this.refresh}>refresh</button>
            </div>
        );
    }
});

var EsCluster = React.createClass({

    getEsClusterStatus: function () {
        var elasticsearchBaseUrl = "http://localhost:9200";
        console.log("getEsStatus");
        var esCluster = this;
        $.get( elasticsearchBaseUrl+"/_nodes")
            .done(function( data ) {
                console.log("done");
                console.log(data);
                esCluster.setState(data);
            }).fail(function() {
                console.log("fail");
            });
    },
    refresh: function(){
        this.getEsClusterStatus();

    },
    getInitialState: function(){
        return({});
    },
    render : function(){
        var nodes = {};
        var scope = this;
        if(this.state.nodes){
            Object.keys(this.state.nodes).forEach(function(entry){
                nodes["node-"+entry] = scope.state.nodes[entry];
            });
        }


        return (
            <div className="clusterStatus">
                <h1>Cluster: {this.state.cluster_name}</h1>
                <ol>
                    {nodes}
                </ol>
                <button type="button" onClick={this.refresh}>refresh</button>
            </div>
        );
    }
});

var node = React.createClass({


    render: function(){
        return ;
    }
});

React.renderComponent(<EsStatus/>, document.getElementById('mount'));
React.renderComponent(<EsCluster/>, document.getElementById('drilldown-mount'));