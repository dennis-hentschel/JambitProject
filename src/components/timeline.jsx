import React, {useEffect} from "react"
import * as chart from "chart.js"
import * as tools from "./tools.js"

import {
	Chart as chartjs,
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	LineElement,
	LineController,
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
	PointElement,
	Title,
	Tooltip,
	Legend
);

const data = JSON.parse('[{"date":"2022-W04","moods":[{"mood":4,"name":"Dennis","comment":"Ich fands ganz cool"},{"mood":3,"name":"Kevin","comment":"Joa war okay"},{"mood":3,"name":"Alexandros","comment": "Hatte schon bessere Wochen"},{"mood":2,"name":"Tobias","comment": "So super war\'s jetzt nicht"},{"mood":0,"name":"Andreas","comment": "Hätte jeden morgen gerne weitergeschlafen"}]},{"date":"2022-W05","moods":[{"mood":3,"name":"Dennis","comment": "War okay"},{"mood":2,"name":"Kevin","comment": "War nicht meine Woche"},{"mood":3,"name":"Alexandros","comment": "Es ging"},{"mood":2,"name":"Tobias","comment": "Es gab schon wieder stress wegen der letzten Cola"},{"mood":3,"name":"Andreas","comment": "besser als letzte Woche"}]},{"date":"2022-W06","moods":[{"mood":5,"name":"Dennis","comment": "Beste Woche ever!"},{"mood":2,"name":"Kevin","comment": "mein Kaffee kam kalt aus der Maschine"},{"mood":1,"name":"Alexandros","comment": "Kaffee war schlecht"},{"mood":2,"name":"Tobias","comment": "naja..."},{"mood":5,"name":"Andreas","comment": "Ich war richtig produktiv!"}]}]')

const start_week = tools.get_url_parameter("t1")
const stop_week = tools.get_url_parameter("t2")

const workers_count = 5

function get_week(date){
	return parseInt(date.toString().split('')[6] + date.toString().split('')[7], 10)
}

function get_year(date){
	const splitted = date.split('')
	return parseInt("" + splitted[0] + splitted[1] + splitted[2] + splitted[3],10)
}

function get_date(year, week){
	var w = ""
	if(week < 10 && week > -10){w = "0"}
	return "" + year + "-W" + w + week
}

function index_for_date(date){
	var is_date = (element) => element.date == date
	return data.findIndex(is_date)
}

function Timeline(){
	console.log(generate_labels())
	useEffect(() => {
		if(start_week != -1 && stop_week != -1){
			if(index_for_date(start_week) != -1 && index_for_date(stop_week) != -1){
				if(get_week(start_week) <= get_week(stop_week) && get_year(start_week) >= get_year(stop_week)){
					render_timeline()
				}
				else{alert("Das Startdatum muss vor dem Enddatum liegen!")}
			}
			else{alert("Für mindestens einen Zeitraum sind entweder keine Daten vorhanden oder es wurde ein nicht valides Datum angegeben!")}
		}
	},[])
	return(
		<div>	
			<br /><div>
				<center>
					<form action="/timeline">
						<label> Von: </label>
						<input type="week" name="t1" /><br />
						<label> Bis: </label>
						<input type="week" name="t2" /><br />
						<input type="submit" value="Laden" />
					</form>
				</center>
			</div>
			<canvas id="timeline" width="10" height="4" />
		</div>
	);
}

function average_mood(date){
	var i = 0
	var added_mood = 0
	for(i = 0; i < data[index_for_date(date)].moods.length; i++){
		 added_mood += data[index_for_date(date)].moods[i].mood
	}
	return added_mood / i
}

function get_data(name){
	var d = []
	for(var i = get_week(start_week); i <= get_week(stop_week); i++){
		var is_name = (element) => element.name == name
		var date_index = index_for_date(get_date(get_year(start_week), i))
		var index_for_name = data[date_index].moods.findIndex(is_name)
		d.push(data[date_index].moods[index_for_name].mood)
	}
	return d
}

function get_colours(count){
	const colours = [[0,0,255],[255,255,0],[255,0,255],[100,200,255],[255,0,0],[0,255,0]]
	var colour_array = []
	for(var i = 0; i < count; i++){
		var c = i
		if(i > colours.length - 1){
			c = Math.round(i/colours.length)
		}
		colour_array.push(colours[c])
	}
	return colour_array
}

function get_averages(){
	var averages = []
	for(var i = get_week(start_week); i <= get_week(stop_week); i++){
		averages.push(average_mood(get_date(get_year(start_week), i)))
	}
	return averages
}

function generate_labels(){
	var weeks = []
	for(var i = get_week(start_week); i <= get_week(stop_week); i++){
		weeks.push("KW " + i)
	}
	return weeks
}

function generate_datasets(){
	var add = 0
	var datasets = []
	var colours = get_colours(workers_count + 1)
	for(var i = 0; i <= workers_count; i++){
		if(i == 0){
			var name = 100
			add = 2
			var label_ = "Durchschnitt"
			var data_ = get_averages()
			var colour_ = colours[i]
		}
		else{
			var name = data[index_for_date(get_date(get_year(start_week), get_week(start_week)))].moods[i - 1].name
			add = 0
			var label_ = name
			var data_ = get_data(name)
			var colour_ = colours[i]
		}
		datasets.push({
			label: label_,
			data: data_,
			backgroundColor: "rgba(" + colour_[0] + "," + colour_[1] + "," + colour_[2] + "," + 0.4 + ")",
			borderColor: "rgba(" + colour_[0] + "," + colour_[1] + "," + colour_[2] + "," + 1 + ")",
			pointBorderColor: "rgba(" + colour_[0] + "," + colour_[1] + "," + colour_[2] + "," + 1 + ")",
			pointBackgroundColor: "white",//"rgba(" + colour_[0] + "," + colour_[1] + "," + colour_[2] + "," + 1 + ")",
			borderWidth: 2 + add,
			pointBorderWidth: 2 + add,
			pointRadius: 4 + add
		})
		
	}
	return datasets
}

function render_timeline(){
	const ctx = document.getElementById('timeline').getContext('2d');
	const timeline = new chart.Chart(ctx, {
		type: 'line',
		data: {
			labels: generate_labels(),
			datasets: generate_datasets()
		},
		options: {
			layout:{
				padding: {
					top: 30,
					right: 120,
					left: 120,
					bottom: 120
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					suggestedMax: 5
				}
			}
		}
	});
}

export default Timeline
