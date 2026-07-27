import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LifeBuoy, PhoneCall, Mail, MessageSquare, 
  Clock, ShieldAlert, ArrowRight, CheckCircle2 
} from "lucide-react";

export default function SupportPage() {
  return (
    <AppShell>
      <div className="max-w-[1400px] mx-auto w-full pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 mb-1 flex items-center gap-3">
              <LifeBuoy className="w-8 h-8 text-teal-700" />
              IT & Biomedical Support Desk
            </h1>
            <p className="text-slate-500">
              Connect with St. Jude's biomedical engineering and clinical software support teams.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-teal-800 hover:bg-teal-900 text-white gap-2 shadow-md">
              <MessageSquare className="w-4 h-4" />
              Open New Ticket
            </Button>
          </div>
        </div>

        {/* Emergency Hotline Banner */}
        <Card className="p-6 mb-8 shadow-sm border-rose-200 bg-rose-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-rose-100 p-3 rounded-xl text-rose-700">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-rose-900">Critical System Emergency?</h2>
              <p className="text-sm text-rose-700">For live patient intervention interruptions or server outages, contact the biomedical hotline immediately.</p>
            </div>
          </div>
          <Button className="bg-rose-700 hover:bg-rose-800 text-white gap-2 px-6 h-11 shrink-0 font-bold shadow-sm">
            <PhoneCall className="w-4 h-4" /> Call Ext. 4400
          </Button>
        </Card>

        {/* Support Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <Card className="p-6 shadow-sm border-slate-200 bg-white">
            <div className="bg-teal-50 w-12 h-12 rounded-xl flex items-center justify-center text-teal-700 mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Live IT Chat</h3>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
              Chat instantly with an on-duty hospital software technician for minor bugs and UI assistance.
            </p>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block mb-4">Average response: 2 mins</span>
            <Button variant="outline" className="w-full border-slate-200 text-teal-800 hover:bg-teal-50 font-semibold">
              Start Chat
            </Button>
          </Card>

          <Card className="p-6 shadow-sm border-slate-200 bg-white">
            <div className="bg-teal-50 w-12 h-12 rounded-xl flex items-center justify-center text-teal-700 mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Email IT Support</h3>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
              Send detailed bug reports or feature integration requests directly to the engineering queue.
            </p>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded inline-block mb-4">support@medintel.stjudes.org</span>
            <Button variant="outline" className="w-full border-slate-200 text-teal-800 hover:bg-teal-50 font-semibold">
              Send Email
            </Button>
          </Card>

          <Card className="p-6 shadow-sm border-slate-200 bg-white">
            <div className="bg-teal-50 w-12 h-12 rounded-xl flex items-center justify-center text-teal-700 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Support Desk Hours</h3>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
              Standard IT administrative support desk operates Monday through Friday, 8:00 AM to 6:00 PM EST.
            </p>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded inline-block mb-4">Emergency IT: 24/7/365</span>
            <Button variant="outline" className="w-full border-slate-200 text-teal-800 hover:bg-teal-50 font-semibold">
              View Schedule
            </Button>
          </Card>

        </div>

        {/* Recent Support Tickets Section */}
        <Card className="p-6 shadow-sm border-slate-200 bg-white">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Your Submitted Support Tickets</h3>
              <p className="text-xs text-slate-500 mt-0.5">Track the status of your reported bugs or feature requests.</p>
            </div>
            <Button className="bg-teal-800 hover:bg-teal-900 text-white text-xs h-9">
              New Ticket
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { id: "TICK-4021", title: "PACS DICOM viewer lagging on high-res MRI scans", status: "In Progress", date: "Today, 10:24 AM", badge: "secondary" },
              { id: "TICK-3988", title: "Request role-based access for new Cardiology fellow", status: "Resolved", date: "Yesterday", badge: "default" },
            ].map((ticket, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
                    <CheckCircle2 className={`w-5 h-5 ${ticket.status === 'Resolved' ? 'text-emerald-600' : 'text-amber-500'}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{ticket.title}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{ticket.id} • Submitted {ticket.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={ticket.badge === 'default' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}>
                    {ticket.status}
                  </Badge>
                  <Button variant="ghost" className="text-teal-700 hover:text-teal-800 h-8 text-xs font-semibold gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </AppShell>
  );
}