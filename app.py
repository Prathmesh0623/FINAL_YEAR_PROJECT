from flask import Flask, render_template, request, jsonify
import geemap
import folium
import ee
from folium.plugins import Draw, Search

app = Flask(__name__)

ee.Authenticate()
ee.Initialize(project='ee-prathmeshkl2003')

@app.route('/')
def index():
    return render_template('index.html')  

@app.route('/sign_in')
def sign_in():
    return render_template('sign_in.html')

@app.route('/sign_up')
def sign_up():
    return render_template('sign_up.html')

@app.route('/tool')
def tool():
    return render_template('tool.html')

@app.route('/generate-map', methods=['POST'])
def generate_map():
   
    nashik_bounds = ee.Geometry.Polygon(
        [[[73.9398, 20.4255],
          [73.9398, 20.5255],
          [74.0398, 20.5255],
          [74.0398, 20.4255]]]) 

    points = nashik_bounds.coordinates().getInfo()

    m = folium.Map(location=[20.4755, 73.9898], zoom_start=8)

    searchable_points = folium.FeatureGroup(name='Searchable Points').add_to(m)

    for coord in points[0]:
        lon, lat = coord
        point = ee.Geometry.Point([lon, lat])
        
        image = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') \
                   .filterBounds(point) \
                   .filterDate('2024-01-01', '2024-09-30') \
                   .sort('CLOUDY_PIXEL_PERCENTAGE') \
                   .first()
        
        vis_params = {
            'min': 0,
            'max': 3000,
            'bands': ['B4', 'B3', 'B2']
        }

        tile_layer = geemap.ee_tile_layer(image, vis_params, f'Sentinel-2 ({lat}, {lon})')
        
        folium.TileLayer(
            tiles=tile_layer.url_format,
            attr='Google Earth Engine',
            overlay=True,
            name=f'Sentinel-2 True Color ({lat}, {lon})'
        ).add_to(m)

        folium.Marker(location=[lat, lon], popup=f"Location: ({lat}, {lon})").add_to(searchable_points)

    folium.LayerControl().add_to(m)

    search = Search(layer=searchable_points, geom_type='Point', placeholder="Search for locations").add_to(m)

    Draw(export=True).add_to(m)

    map_file = 'static/nashik_map_with_search_and_controls.html'  
    m.save(map_file)

    return jsonify({'map_url': map_file})

if __name__ == '__main__':
    app.run(debug=True)  
