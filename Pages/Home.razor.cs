using System.Text.Json;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace SexPistols.Pages;

public record Geolocation
(
    decimal Latitude, 
    decimal Longitude, 
    decimal Accuracy
);

public record Address
(
    string ISO3166_2_lvl4,
    string Tourism,
    string Suburb,
    string State,
    string Road,
    string Region,
    string Postcode,
    string Municipality,
    string County,
    string CountryCode,
    string Country,
    string City
);

public partial class Home(IJSRuntime jSRuntime) : ComponentBase
{
    public Geolocation? Geolocation { get; set; }
    public Address? Address { get; set; }

    // protected override async Task OnInitializedAsync()
    // {
    //     await jSRuntime.InvokeVoidAsync("getGeolocation2", DotNetObjectReference.Create(this));
    // }

    // [JSInvokable("geolocation")]
    // public void SetGeolocation(string geolocation)
    // {
    //     Console.WriteLine(geolocation);
    //     // Geolocation = JsonSerializer.Deserialize<Geolocation>(geolocation);
    //     // StateHasChanged();
    // }
}