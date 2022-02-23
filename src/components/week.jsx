import React, {useEffect} from "react"
import * as chart from "chart.js"
import * as tools from "./tools.js"

import {
	Chart as chartjs,
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

chartjs.register(
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	Title,
	Tooltip,
	Legend
);

const data = JSON.parse('[{"date":"2022-W04","moods":[{"mood":4,"name":"Dennis"},{"mood":3,"name":"Kevin"},{"mood":3,"name":"Alexandros"},{"mood":2,"name":"Tobias"},{"mood":0,"name":"Andreas"}]},{"date":"2022-W05","moods":[{"mood":0,"name":"Dennis"},{"mood":0,"name":"Kevin"},{"mood":3,"name":"Alexandros"},{"mood":2,"name":"Tobias"},{"mood":0,"name":"Andreas"}]}]') 

const colours = [[255,0,0],[255,80],[255,190,0],[255,255,0],[170,255,0],[100,255,0]]
const date = tools.get_url_parameter("date")

function Week(){
	useEffect(() => {
		if(date != -1){
			if(index_for_date(date) != -1){render_chart()}
			else{alert("Für diese Woche sind entweder keine Daten vorhanden oder es wurde ein nicht valides Datum angegeben!")}
		}
	},[])
	return(
		<div>
			<center>
				<div>
					<form action="/week">
						<br/><input type="week" name="date" size="8" placeholder="Kalenderwoche"/>
						<input type="submit" class="week-submit" value="Laden" />
					</form>
					<div class="button-wrapper">
						<button class="export-button" onClick={ () => export_data()}>Export</button>
					</div>
				</div>
			</center>
			<canvas id="week_chart" width="10" height="4"></canvas>
		</div>
	);
}

function index_for_date(date){
	var is_date = (element) => element.date == date
	return data.findIndex(is_date)
}

function get_data_as_array(info, date){
	var content = []
	var date_index = index_for_date(date)
	for(var i = 0; i < data[date_index].moods.length; i++){
		if(info === "name"){
			content.push(data[date_index].moods[i].name)
		}
		else if(info ===  "mood"){
			var mood = data[date_index].moods[i].mood
			if(mood === 0){mood += 0.1}
			content.push(mood)
		}
		else{
			return -1
		}
	}
	return content
}

function generate_colours(colour, date){
	var content = []
	var date_index = index_for_date(date)
	var alpha = 1
	if(colour === "background"){
		alpha = 0.4
	}
	for(var i = 0; i < data[date_index].moods.length; i++){
		var rgba = [
			colours[data[date_index].moods[i].mood][0],
			colours[data[date_index].moods[i].mood][1],
			colours[data[date_index].moods[i].mood][2],
			alpha
		]
		content.push("rgba(" + rgba.toString() + ")")
	}
	return content
}

function render_chart(){
	console.log("TEST")
	const ctx = document.getElementById('week_chart').getContext('2d');
	const week_chart = new chart.Chart(ctx, {
		type: 'bar',
		data: {
			labels: get_data_as_array("name", date),
			datasets: [{
				label: 'Stimmung',
				data: get_data_as_array("mood", date),
				backgroundColor: generate_colours("background", date),
				borderColor: generate_colours("", date),
				borderWidth: 2
			}]
		},
		options: {
			layout: {
				padding: {
					top: 30,
					right: 120,
					left: 120,
					bottom: 120,
				}
			},
			scales: {
				y: {
					beginAtZero: false
				}
			}
		}
	});
}

function generate_filename(){
	return "Stimmung der Mitarbeiter - " + date + ".md"
}

function generate_file_content(){
	var date_index = index_for_date(date)
	var content = "# Stimmungsbild der Mitarbeiter - " + date
	content += "\n\n| Name | Stimmung | Kommentar |\n"
	content += "|---------------|---------------|---------------|"
	for(var i = 0; i < data[date_index].moods.length; i++){
		content += "\n| " + data[date_index].moods[i].name + " | " + data[date_index].moods[i].mood + " | " + data[date_index].moods[i].comment
	}
	return content
}

function export_data() {
	var download_element = document.createElement('a')
	download_element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(generate_file_content()))
	download_element.setAttribute('download', generate_filename())
	document.body.appendChild(download_element)
	download_element.click()
}

export default Week
