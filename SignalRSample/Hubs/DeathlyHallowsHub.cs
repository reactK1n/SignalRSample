using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
	public class DeathlyHallowsHub : Hub
	{
		public Dictionary<string, int> GetRaceStatus()
		{
			return SD.DealthyHallowRace;
		}

		
/*		public override Task OnConnectedAsync()
		{
			//send update to all client that the total views has been updated;
			Clients.All.SendAsync("updateDeathlyHallowsCount",
				SD.DealthyHallowRace[SD.Cloak],
				SD.DealthyHallowRace[SD.Stone],
				SD.DealthyHallowRace[SD.Wand])
				.GetAwaiter().GetResult();
			return base.OnConnectedAsync();
		}*/
	}
}
