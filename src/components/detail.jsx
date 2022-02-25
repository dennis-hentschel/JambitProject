import React, {useEffect} from "react";
import * as tools from "./tools.js"
import * as chart from "chart.js"

import {
	Chart as chartjs,
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	LineElement,
	LineController,
	ScatterController,
	PointElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

chartjs.register(
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	LineElement,
	LineController,
	ScatterController,
	PointElement,
	Title,
	Tooltip,
	Legend
);


const data = JSON.parse('[{"date":"2022-W04","moods":[{"mood":4,"name":"Dennis","comment":"Ich fands ganz cool"},{"mood":3,"name":"Kevin","comment":"Joa war okay"},{"mood":3,"name":"Alexandros","comment": "Hatte schon bessere Wochen"},{"mood":2,"name":"Tobias","comment": "So super war\'s jetzt nicht"},{"mood":0,"name":"Andreas","comment": "Hätte jeden morgen gerne weitergeschlafen"}]},{"date":"2022-W05","moods":[{"mood":3,"name":"Dennis","comment": "War okay"},{"mood":2,"name":"Kevin","comment": "War nicht meine Woche"},{"mood":3,"name":"Alexandros","comment": "Es ging"},{"mood":2,"name":"Tobias","comment": "Es gab schon wieder stress wegen der letzten Cola"},{"mood":3,"name":"Andreas","comment": "besser als letzte Woche"}]},{"date":"2022-W06","moods":[{"mood":5,"name":"Dennis","comment": "Beste Woche ever! Danke an alle für die tollen Erlebnisse!"},{"mood":2,"name":"Kevin","comment": "mein Kaffee kam kalt aus der Maschine"},{"mood":1,"name":"Alexandros","comment": "Kaffee war schlecht"},{"mood":2,"name":"Tobias","comment": "naja..."},{"mood":5,"name":"Andreas","comment": "Ich war richtig produktiv!"}]}]')

const names = JSON.parse('{"names":["Kevin","Dennis","Tobias","Alexandros","Andreas"]}')

const name = tools.get_url_parameter("name")

const visible_comments = 20

function names_as_array(){
	var n = []
	for(var i = 0; i < names.names.length; i++){
		n.push(names.names[i])
	}
	return n
}

function Detail(){
	useEffect(() => {
		document.getElementById("comment-container").style.visibility = "hidden"
		if(name !== -1){
			if(names_as_array().includes(name)){
				render_page()
			}
			else{alert("Dieser Mitarbeiter ist nicht bekannt!")}
		}
	},[])
	return(
		<div>
			<br />
			<form align="center" action="/detail">
				<input type="text" name="name" placeholder="Mitarbeiter" size="10" />
				<input type="submit" value="Laden" />
			</form><br />
			<h1 id="title" class="font-weight-light" align="center"></h1>
			<div align="center"><div class="comment-container" id="comment-container"/></div>
			<div><canvas id="dot-plot" width="10" height="1"/></div>
		</div>
	);
}

function get_comments(){
	var comments = ""
	var rounds = data.length
	var start = data.length - 1
	if(data.length > visible_comments){rounds = visible_comments}
	for(var i = 0; i < rounds; i++){
		var is_name = (element) => element.name === name
		var name_index = data[i].moods.findIndex(is_name)
		var comment = String(data[start - i].moods[name_index].comment)
		comments += comment + "<br/><br/>"
	}
	console.log(comments)
	return comments
}

function render_page(){
	document.getElementById("title").innerHTML = name
	var comment_container = document.getElementById("comment-container")
	comment_container.style.visibility = "visible"
	comment_container.innerHTML = get_comments()
	render_dot_plot()
}

function generate_data(){
	var d = []
	var rounds = data.length
	var start = 0
	if(rounds > 20){
		rounds = 20
		start = data.length - 21
	}
	for(var i = start; i < rounds; i++){
		var is_name = (element) => element.name == name
		var name_index = data[i].moods.findIndex(is_name)
		d.push({x: data[i].moods[name_index].mood, y: i - 10 - start})
	}
	return d
}

function render_dot_plot(){
	const ctx = document.getElementById("dot-plot").getContext("2d")
	const dot_plot = new chart.Chart(ctx,{
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Verteilung der Zufriedenheitswerte',
				data: generate_data(),
				backgroundColor: 'rgb(255, 99, 132)',
				pointRadius: 5
			}],
		},
		options: {
			scales: {
				x: {
					grid: {
						display: false
					},
					display: true,
					beginAtZero: true,
					suggestedMax: 5,
					type: 'linear',
					position: 'bottom'
				},
				y: {
					grid: {
						display: false
					},
					display: false,
					suggestedMin: -10,
					suggestedMax: 10
				}
			},
			events: [],
		}
	})
}

export default Detail
